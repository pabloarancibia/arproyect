const {Mqtt_messages_gral, Tarjeta, Estado,
        Registro_Cambios_Estado, Orden_trabajo,
        Eventos_mqtt} = require('../database/models/index');


const { Op } = require("sequelize");
const Sequelize = require('sequelize');
/**
 * Coordinador de mensajes mqtt recibidos.
 * @param {*} topic 
 * @param {*} payload 
 * @param {*} res 
 */
 const mqtt_coordinator = async (topic, payload, retain,mqtt_client, res) => {
    console.log('coordinador de mensajes mqtt en mqttController: ', topic, payload.toString());
    try {
        await receiveMessage(topic,payload);
    } catch (error) {
        console.log(error)
    }
    
    // verifico si es retain
    if (retain.retain==1){
        // clean retain topic
        console.log('retain true: ', retain.retain)
        console.log('msg en Retain true: ',topic, payload.toString())
        mqtt_client.publish(topic, '', { qos: 0, retain: true }, (error) => {
          if (error) {
            console.error(error)
          }
        })

    }else{
        // no es retain -> continuar
        //console.log(retain.retain)
        console.log('Receive Message: ',topic, payload.toString())

        //CAMBIAR ESTADO
        if (topic==process.env.MQTT_TOPIC_CAMBIARESTADO){
            console.log('funcion cambiar estado');
        //   mqtt_client.publish('api/test', 'funcion cambiar estado', { qos: 0, retain: false }, (error) => {
        //     if (error) {
        //       console.error(error)
        //     }
        //   });
            const payload_json = JSON.parse(payload.toString());
            //ejemplo json: { tajeta: '51210250150', nodo: 'finalizado', estado: 'finalizado' }
            
            console.log('estado recibido: ', payload_json.estado);
            console.log('tarjeta recibida: ', payload_json.tarjeta);

            // Busco la tarjeta en la db
            const tarjeta = await Tarjeta.findOne({
                where: {
                    numero:payload_json.tarjeta,
                    }
                });
            if (!tarjeta){
                //***hacer pub error
                console.log('no se encuentra tarjeta en db');
                pubErrorMqtt(payload_json.nodo, mqtt_client);

                return;
            }

            // verifico si la tarjeta esta como libre
            const estado_libre = await Estado.findOne({
                where:{
                    nombre:{
                        [Op.like]:'%libre%'
                    }
                }
            });
            if (tarjeta.EstadoId == estado_libre.id){
                //***pub error
                console.log('Error: tarjeta libre!');
                pubErrorMqtt(payload_json.nodo, mqtt_client);
                return;
            }else{

                // Busco la Orden en la db
                const orden = await Orden_trabajo.findOne({
                where: {
                    tarjeta:tarjeta.numero,
                    }
                });

                if(!orden){
                    //*** pub error
                    //*** registrar log error
                    console.log('Error: no se encuentra orden asociada a esa tarjeta!');
                    pubErrorMqtt(payload_json.nodo, mqtt_client);
                    return;
                }

                // Modifico estado de la Orden

                    // Busco el Estado a asignar
                    const estado_a_asignar = await Estado.findOne({
                        where:{
                            nombre:{
                                [Op.like]:'%'+payload_json.estado+'%'
                            }
                        }
                    });
                    if (!estado_a_asignar){
                        console.log('Error, mqtt sin estado a asignar');
                        pubErrorMqtt(payload_json.nodo, mqtt_client);
                        //***hacer pub error
                        return;
                    }

                // modifico orden
                const orden_modif = await Orden_trabajo.update(
                    {EstadoId : estado_a_asignar.id},
                    {
                    where: {
                        id:orden.id,
                        }
                    });

                
                // Modifico estado de la Tarjeta  
                await Tarjeta.update(
                    {EstadoId:estado_a_asignar.id},
                    {where: {id:tarjeta.id}}
                );

                // Registro el cambio de estado
                await Registro_Cambios_Estado.create({
                    EstadoId:estado_a_asignar.id,
                    Orden_trabajoId:orden_modif.id,
                    fecha:Date.now()
                }
                )

                }

        }
        // DISCRIMINAR
        if (topic==process.env.MQTT_TOPIC_DISCRIMINAR){
          console.log('funcion discriminar');
          // valido datos
          const payload_json = JSON.parse(payload.toString());
          //ejemplo json: { tajeta: '51210250150', nodo: 'mostrador', estado: 'discriminar' }
          
          console.log('nodo recibido: ', payload_json.nodo);
          console.log('estado recibido: ', payload_json.estado);
          console.log('tarjeta recibida: ', payload_json.tarjeta);

          // busco datos necesarios
          const estado_libre = await Estado.findOne({
            where:{
                    nombre:{
                        [Op.like]:'%libre%'
                    }   
                }
            });

          // buscar estado actual Tarjeta:
          // busco la tarjeta en la db
          let tarjeta = await Tarjeta.findOne({
            where: {
                numero:payload_json.tarjeta,
                }
            });
            if (!tarjeta){
                // si la tarjeta no existe debo crearla en el modelo Tarjeta
                console.log('tarjeta nueva en db');
                tarjeta = await Tarjeta.create({
                    numero:payload_json.tarjeta,
                    descripcion: 'alta desde api',
                    EstadoId:estado_libre.id
                });
            }
          // condicional según estado de Tarjeta
          
          // si Tarjeta libre entonces accion = nueva en Eventos
            if (tarjeta.EstadoId == estado_libre.id){
                try {
                    const newEvent = await Eventos_mqtt.create({
                        TarjetaId:tarjeta.id,
                        accion:process.env.ACCION_NUEVA,
                        nodo:payload_json.nodo,
                        observaciones:'en api para tarjeta libre',
                        is_active:true
                    });
                    console.log('Evento nuevo: ', newEvent);
                    console.log('tarjeta: ',tarjeta);
                } catch (error) {
                    console.log('Error: problema creando evento mqtt para tarjeta nueva')
                    console.log(error);
                    

                    return;
                }
                
            }else{
                // Tarjeta no libre = accion en_uso en Eventos
                // traer orden asociada:
                // OT debe tener tarjeta.id,estado != retirado, 
                //  
                try {
                    await Eventos_mqtt.create({
                        TarjetaId:tarjeta.id,
                        Orden_trabajoId: tarjeta.Orden_trabajoId,
                        accion:process.env.ACCION_ENUSO,
                        nodo:payload_json.nodo,
                        observaciones:'en api para tarjeta en uso',
                        is_active:true
                    });
                } catch (error) {
                    console.log('Error: problema creando evento mqtt para tarjeta en uso')
                    console.log(error)
                    
                    return;
                }
            }
          
        }
    }
 }

/**
 * Guarda msg mqtt recibido en tabla Mqtt_messages_gral
 * @param {*} topic 
 * @param {*} message = payload
 * @param {*} res 
 */
const receiveMessage = async (topic, message, res) => {
    const newMessage = await Mqtt_messages_gral.create({
        topic, message
    });
}

/**
 * Publicar un error por mqtt
 * @param {*} node nodo emisor a quien enviar el pub error
 * @param mqtt_client conexion mqtt
 * @param payload mensaje opcional
 */
const pubErrorMqtt = async (node, mqtt_client, payload = 'error_gral' ) => {

    // armo el topic
    const topic_error = `${process.env.MQTT_TOPIC_PUB_ERROR}${node}`;
    console.log('topic error: ',topic_error);

    // envio el pub
    mqtt_client.publish(topic_error, payload, { qos: 0, retain: false }, (error) => {
    if (error) {
        console.error(error)
    }
    });

}

module.exports = {mqtt_coordinator, pubErrorMqtt};

