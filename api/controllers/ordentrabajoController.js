const {OrdenTrabajo,Cliente, Estado, Moto, Trabajo, Usuario,
    Registro_Cambios_Estado, Tarjeta} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

/**
 * 
 * @method getTrabajos 
 * @description
 * Traer todas las ordenes de trabajo existentes
 * @returns
 * listado de todas las ordenes de trabajos existentes
 */
const getOrdenesTrabajo = async (req, res)=>{
    const ordenesTrabajo = await OrdenTrabajo.findAll({
        include:[
            {model:Cliente},
            {model: Estado},
            {model: Moto},
            {model: Trabajo},
            {model: Usuario},
        ]
    });
    return res.json(ordenesTrabajo)
}

/**
 * 
 * @method getOrdenTrabajoBy 
 * @params fecha_desde, fecha_hasta, estado
 * @description
 * Traer ordenes de trabajo por 
 * fecha, estado
 * @returns
 * listado de todas las ordenes de trabajos existentes
 * filtradas por fecha o estado
 */
const getOrdenTrabajoBy = async(req,res)=>{
    let {fecha_desde,fecha_hasta, estado} = req.params;
    console.log(estado)
    if (!fecha_desde){
        fecha_desde = Date.now();
    }
    if (!fecha_hasta){
        fecha_hasta = Date.now();
    }

    //'''condicion where para estado, si no está estado: queda vacía.'''
    whereCondition = {}

    if(estado){
        //'''si está el parametro estado, preparo la condicion'''
        whereCondition = {
            nombre:{
                [Op.like]:'%'+estado+'%',
            },
        }
    }
    try {
        let ordenesTrabajo = await OrdenTrabajo.findAll({
            order: [["id", "ASC"]],
            include: [{
                model: Estado,
                attributes: ['nombre'],
                // ''' inserto la condicion where previamente preparada '''
                where: whereCondition
            },{
                model: Cliente,
                attributes: ['nombre', 'apellido', 'celular'],

            },{
                model: Trabajo,
                attributes: ['nombre', 'descripcion'],

            },{
                model: Moto,
                attributes: ['marca', 'modelo', 'anio', 'cilindrada', 'observaciones'],

            }],
            where:{                
                createdAt: {
                    [Op.lte]: new Date(new Date(fecha_hasta).getTime() + 60 * 60 * 24 * 1000 - 1),
                    [Op.gte]: fecha_desde,
                 }
            }
        })

        return res.json(ordenesTrabajo)

    }catch (error){
        res.status(400).json(error.message);
    }

}


const getOrdenTrabajoByCliente = async (req,res) => {
    const dni_cliente = req.params.dni_cliente;
    if (!dni_cliente){
        return res.status(400).json({message: 'falta dni cliente'})
    }
    
    try {
        let cliente = await Cliente.findOne({where: {dni:dni_cliente}})        
    
        if (!cliente){
            return res.status(400).json({message:'No se encontró cliente'})
        }

    
        const ordenesTrabajo = await OrdenTrabajo.findAll({
            where: {
                ClienteId:cliente.id
            },
            include: [
                {model: Estado,
                attributes: ['nombre'],
                where: {
                    nombre:{
                        [Op.notLike]:'%retirado%',
                    }
                }},
                {model: Cliente,attributes:['nombre','apellido']},
                {model:Moto, attributes:['marca','modelo']},
                {model:Trabajo, attributes:['nombre']}
            ],
            attributes: ['precio','entrega','detalle']
        });
        return res.json(ordenesTrabajo);
    } catch (error) {
        return res.status(400).json({error:error.message, message: 'error encontrando orden'})        
    }
}

const nuevaOrdenTrabajo = async (req,res) => {
    try {
        //buscar estado para asegurar que sea "En Espera"
        const estado = await Estado.findOne({
            where: {
                nombre:{
                    [Op.like]:'%'+req.body.estado+'%'
                }
            }
        })
        if (!estado){
            return res.status(400).json({message: 'No se encontró estado'})
        }

        // creo orden de trabajo
        const nuevaOrdenTrabajo = await OrdenTrabajo.create(
            req.body, 
            );
        nuevaOrdenTrabajo.EstadoId = estado.id;
        
        await nuevaOrdenTrabajo.save();
        if (!nuevaOrdenTrabajo){
            return res.status(400).json({
                message: 'No se pudo crear nueva orden de trabajo',
                context: 'api > controllers > ordenTrabajoController > nuevaOrdenTrabajo'
            })
        }

        // Asigno a Tarjeta la ref a la nueva OT
        // Modifico estado de la Tarjeta  
        if(nuevaOrdenTrabajo.tarjeta){
            let tarjeta = await Tarjeta.findOne(
                {
                    where: {numero: nuevaOrdenTrabajo.tajeta}
                }
            );
            if (tarjeta){
                await Tarjeta.update(
                    {
                        EstadoId : estado.id,
                        OrdenTrabajoId : nuevaOrdenTrabajo.id
                    },
                    {
                        where: {numero: nuevaOrdenTrabajo.tajeta}
                    }
                );
            }
        };

        // Registro el cambio de estado
        await Registro_Cambios_Estado.create({
            EstadoId:estado.id,
            OrdenTrabajoId:nuevaOrdenTrabajo.id,
            fecha:Date.now()
        }
        )

        return res.json(nuevaOrdenTrabajo);
    } catch (error) {
        return res.status(400).json({
            error:error.message, 
            message:'Error cargando orden',
            context: 'api > controllers > ordenTrabajoController > nuevaOrdenTrabajo'
        })  
    }
    
}

/**
     * Cambiar estado orden de trabajo y [tarjeta]
     * @params id_orden, precio, saldo, detalle, estado(OT)
     * [TarjetaId][TarjetaEstado]
     * Si se recibe TarjetaId y TarjetaEstado se cambia el mismo
     */
const retirarOrdenTrabajo = async (req, res) => {
    try {
        if (!req.body.estado 
            || !req.params.id_orden 
            || !req.body.precio
            || !req.body.entrega
            || !req.body.detalle
            ){
            return res.status(400).json({message:'Debe incluir estado, id de orden, precio, saldo y detalle'})
        }
        // Busco el Estado 
        const estado = await Estado.findOne({
            where:{
                nombre:{
                    [Op.like]:'%'+req.body.estado+'%'
                }
            }
        });
        if (!estado){
            return res.status(400).json({message:'No se encuentra estado'})
        }

        let orden = await OrdenTrabajo.findOne({
            where: {
                id:req.params.id_orden,
                }
            });
        
        if(!orden){
            return res.status(400).json({message:'No se encuentra Orden de Trabajo'})
        }

        // Modifico estado, precio, detalle y saldo de la Orden
        const orden_modif = await OrdenTrabajo.update(
            {
                EstadoId : estado.id,
                precio: req.body.precio,
                entrega: req.body.entrega,
                detalle: req.body.detalle
            },
            {
            where: {
                id:orden.id,
                }
            });

        
        // Busco la Tarjeta según el id enviado en body
        // Modifico estado de la Tarjeta 

        if(req.body.TarjetaId && req.body.TarjetaEstado){
            let tarjeta = await Tarjeta.findOne(
                {
                    where: {
                        id: req.body.TarjetaId
                    }
                }
            );
            if (tarjeta){
                // Busco el Estado para la Tarjeta
                const estadoTarjeta = await Estado.findOne({
                    where:{
                        nombre:{
                            [Op.like]:'%'+req.body.TarjetaEstado+'%'
                        }
                    }
                });
                if (!estadoTarjeta){
                    return res.status(400).json({message:'No se encuentra estado de tarjeta'})
                }

                // Actualizo el estado 
                await tarjeta.update(
                    {
                        EstadoId:estadoTarjeta.id
                    }
                );
            }

        }; 

        // Registro el cambio de estado
        await Registro_Cambios_Estado.create({
            EstadoId:estado.id,
            OrdenTrabajoId:orden_modif.id,
            fecha:Date.now()
        }
        )

        // Si el estado se registró como finalizado, 
        // dar aviso al cliente

        /*// Verifico que el estado sea finalizado y que la orden ya modificada tenga ese estado
        if (estado.nombre == 'finalizado' && orden_modif.EstadoId == estado.id){
            // verifico que el cliente esté cargado y tenga celular
            const cliente = await Cliente.findOne({
                where: {
                    id : orden_modif.ClienteId
                }
            })
            if (cliente && cliente.celular){
                // enviar sms
                // registrar el aviso
            }else{
                //registrar no aviso
            }
        }*/
        
        return res.json({
            message: 'Estado modificado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message, 
            message:'Error en la petición'
        })
    }
}

module.exports = {getOrdenesTrabajo, getOrdenTrabajoBy, 
    getOrdenTrabajoByCliente,nuevaOrdenTrabajo, retirarOrdenTrabajo};