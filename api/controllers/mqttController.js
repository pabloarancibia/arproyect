const {Mqtt_messages_gral, Tarjeta, Estado,Registro_Cambios_Estado, Orden_trabajo} = require('../database/models/index');
const mqtt = require('mqtt')


const { Op } = require("sequelize");
const Sequelize = require('sequelize')

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

        //Cambiar Estado
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
                console.log('no se encuentra tarjeta en db')
                return;
            }

            console.log('tarjeta: ',tarjeta);

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
                console.log('tarjeta libre!')
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
                    console.log('no se encuentra orden asociada a esa tarjeta!')
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
                        console.log('error, mqtt sin estado a asignar')
                        //***hacer pub error
                        return;
                    }

                    console.log('estado a asignar: ',estado_a_asignar);

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
        if (topic==process.env.MQTT_TOPIC_DISCRIMINAR){
          console.log('funcion discriminar');
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

    // callback según topic recibido
        // msg test
    //if (topic == 'esp/test'){
        //testMessage(topic, message);
    //}
        // msg cambio estado
        // msg notificación
        // msg configuración

    // ** dentro de cada callback se realiza en res a mqtt broker
}

/**
 * Procesa topic esp/test
 * muestra el mensaje en consola
 * devuelve un pub informando la recepción al broker
 * @param {*} topic 
 * @param {*} payload 
 */
function testMessage (topic, payload){
    console.log('Topic: '+topic+' Mensaje: '+payload);

    // publisher response
}

/**
 * Procesa topic 
 * guarda/actualiza el estado del producto
 * devuelve un pub informando la recepción al broker
 * @param {*} topic 
 * @param {*} payload 
 */
 function estadoMessage (topic, payload){
    console.log('Topic: '+topic+' Mensaje: '+payload);

    // save/update db tabajo_estado

    // publisher response
}

module.exports = {mqtt_coordinator};

