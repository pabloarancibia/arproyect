const {Eventos_mqtt, Repuesto, Orden_trabajo} = require('../database/models/index');
const { QueryTypes } = require('sequelize');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');
/**
 * Obtener último evento mqtt con acción nueva o en_uso.
 * Una vez leído se setea is_active en false.
 * @param {*} req accion, fecha_desde.
 * @param {*} res json con evento y n° de tarjeta.
 * @returns res
 */
const getUltimoEventoByAccion = async (req, res)=>{
    let {fecha_desde, accion} = req.params;
    if (!accion) {res.status(400).json({message:'Debe incluir accion a buscar'});}
    if (!fecha_desde) {res.status(400).json({message:'Debe incluir desde que fecha buscar'});}

    const fechadesde = new Date(fecha_desde) 
    const is_active = true;

    let evento_mqtt = await Eventos_mqtt.findOne({
        where: {
            updatedAt: {
            [Op.gte]: fechadesde,
         },
         accion: accion,
         is_active: is_active
        },
        order:[['updatedAt','DESC']],
        include: [{
            model:Orden_trabajo,
            include: Repuesto
        }]
    });

    // let evento_mqtt = await sequelize.query(
    //     "SELECT `Eventos_mqtt`.`id`, `accion`, `nodo`, `Eventos_mqtt`.`observaciones`, `Eventos_mqtt`.`is_active`, \
    //     `Eventos_mqtt`.`createdAt`, `Eventos_mqtt`.`updatedAt`, \
    //     `Eventos_mqtt`.`Orden_trabajoId`, \
    //     `Orden_Trabajo`.`EstadoId` AS `Orden_trabajo.EstadoId`,\
    //     `Orden_Trabajo`.`detalle` AS `Orden_trabajo.detalle`,\
    //     `Orden_Trabajo`.`precio` AS `Orden_trabajo.precio`,\
    //     `Orden_Trabajo`.`entrega` AS `Orden_trabajo.entrega`,\
    //     `Estado_OT`.`nombre` AS `Estado.nombre`,\
    //     `Trabajo_OT`.`nombre` AS `Trabajo.nombre`,\
    //     `Cliente_OT`.`nombre` AS `Cliente.nombre`,\
    //     `Cliente_OT`.`apellido` AS `Cliente.apellido`,\
    //     `Cliente_OT`.`dni` AS `Cliente.dni`,\
    //     `Cliente_OT`.`celular` AS `Cliente.celular`,\
    //     `Moto_OT`.`marca` AS `Moto.marca`,\
    //     `Moto_OT`.`modelo` AS `Moto.modelo`,\
    //     `Moto_OT`.`año` AS `Moto.año`,\
    //     `Moto_OT`.`observaciones` AS `Moto.observaciones`,\
    //     `TarjetaId` , `Tarjeta`.`numero` AS `Tarjeta.numero`\
    //     FROM `Eventos_mqtt` AS `Eventos_mqtt` \
    //     INNER JOIN `Tarjeta` AS `Tarjeta` \
    //     ON TarjetaId = Tarjeta.id \
    //     INNER JOIN `Orden_trabajo` AS `Orden_Trabajo` \
    //     ON `Eventos_mqtt`.`Orden_trabajoId` = Orden_Trabajo.id \
    //     INNER JOIN `Estado` AS `Estado_OT` \
    //     ON `Orden_Trabajo`.`EstadoId` = Estado_OT.id \
    //     INNER JOIN `Trabajo` AS `Trabajo_OT` \
    //     ON `Orden_Trabajo`.`TrabajoId` = Trabajo_OT.id \
    //     INNER JOIN `Cliente` AS `Cliente_OT` \
    //     ON `Orden_Trabajo`.`ClienteId` = Cliente_OT.id \
    //     INNER JOIN `Moto` AS `Moto_OT` \
    //     ON `Orden_Trabajo`.`MotoId` = Moto_OT.id \
    //     WHERE `Eventos_mqtt`.`updatedAt` >= :fechadesde \
    //     AND `Eventos_mqtt`.`accion` = :accion \
    //     AND `Eventos_mqtt`.`is_active` = :is_active \
    //     ORDER BY `Eventos_mqtt`.`updatedAt` \
    //     DESC LIMIT 1;", { 
    //         replacements: { 
    //             fechadesde: fechadesde,
    //             accion: accion,
    //             is_active: is_active
    //         },
    //         type: QueryTypes.SELECT })

    if (!evento_mqtt || evento_mqtt==''){ 
        return res.status(204).json({message: 'no se encuenta evento_mqtt con estado: '+accion});
    }

    // debido a que ya se leyó el evento, lo marco como is_active false.
    Eventos_mqtt.update(
        {is_active:false},
        {where:{id:evento_mqtt[0]['id']}}
        );

    return res.status(200).json(evento_mqtt);


}

module.exports = {getUltimoEventoByAccion} 