const {Eventos_mqtt, Estado,Trabajo, Repuesto, 
    OrdenTrabajo, Tarjeta,Cliente, Moto, Origen} = require('../database/models/index');
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
        //attributes: {exclude: ['TarjetumId']},
        include: [{
            model:OrdenTrabajo,
            include: [
                {model: Trabajo},
                {model: Estado}, 
                {
                    model: Repuesto,
                    include: Origen
                }, 
                {model: Cliente}, 
                {model: Moto},
            ],
            //include: { all: true}

        },{
            model: Tarjeta, as: 'Tarjeta'
        }],
        order:[['updatedAt','DESC']],
        
    });

    

    if (!evento_mqtt || evento_mqtt==''){ 
        return res.status(204).json({message: 'no se encuenta evento_mqtt con estado: '+accion});
    }

    // debido a que ya se leyó el evento, lo marco como is_active false.
    evento_mqtt.update(
        {
            is_active:false
        },
        );

    return res.status(200).json(evento_mqtt);


}

module.exports = {getUltimoEventoByAccion} 