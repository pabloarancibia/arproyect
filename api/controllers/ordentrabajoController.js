const {Orden_trabajo,Cliente, Estado, Moto, Trabajo, Usuario,
    Registro_Cambios_Estado} = require('../database/models/index');

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
    const ordenesTrabajo = await Orden_trabajo.findAll({
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
        let ordenesTrabajo = await Orden_trabajo.findAll({
            order: [["id", "ASC"]],
            include: [{
                model: Estado,
                attributes: ['nombre'],
                // ''' inserto la condicion where previamente preparada '''
                where: whereCondition
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
        res.status(500).json(error.message);
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

    
        const ordenesTrabajo = await Orden_trabajo.findAll({
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
        return res.status(500).json({error:error, message: 'error encontrando orden'})        
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

        const nuevaOrdenTrabajo = await Orden_trabajo.create(
            req.body, 
            );
        nuevaOrdenTrabajo.EstadoId = estado.id;
        nuevaOrdenTrabajo.save();
        return res.json(nuevaOrdenTrabajo);
    } catch (error) {
        return res.status(500).json({error:error, message:'Error cargando orden'})  
    }
    
}

/**
     * Cambiar estado orden de trabajo y tarjeta
     * @params id_orden, estado
     * Recibe id_orden y estado a asignar.
     * Si la orden tiene tarjeta cargada, cambio su estado
     */
const cambiarEstadoOrdenTrabajo = async (req, res) => {
    try {
        if (!req.body.estado || !req.body.id_orden){
            return res.status(400).json({message:'Debe incluir estado y id de orden'})
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

        let orden = await Orden_trabajo.findOne({
            where: {
                id:req.body.id_orden,
                }
            });
        
        if(!orden){
            return res.status(400).json({message:'No se encuentra Orden de Trabajo'})
        }

        // Modifico estado de la Orden
        const orden_modif = await Orden_trabajo.update(
            {EstadoId : estado.id},
            {
            where: {
                id:orden.id,
                }
            });

        
        // Modifico estado de la Tarjeta  
        if(orden_modif.tarjeta){
            let tarjeta = await Tarjeta.findOne(
                {
                    where: {numero: orden_modif.tajeta}
                }
            );
            if (tarjeta){
                await Tarjeta.update(
                    {EstadoId:estado.id},
                    {
                        where: {numero: orden_modif.tajeta}
                    }
                );
            }
        };

        // Registro el cambio de estado
        await Registro_Cambios_Estado.create({
            EstadoId:estado.id,
            Orden_trabajoId:orden_modif.id,
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
        
        return res.json({message: 'Estado modificado correctamente'})
    } catch (error) {
        return res.status(500).json({error:error, message:'Error en la petición'})
    }
}

module.exports = {getOrdenesTrabajo, getOrdenTrabajoBy, 
    getOrdenTrabajoByCliente,nuevaOrdenTrabajo, cambiarEstadoOrdenTrabajo};