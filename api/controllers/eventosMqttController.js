const {Eventos_mqtt, Tarjeta, Estado} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

const getUltimoEventoByAccion = async (req, res)=>{
    let {estado,fecha_desde, accion} = req.params;
    if (!estado) {res.status(400).json({message:'Debe incluir estado a buscar'});}
    if (!accion) {res.status(400).json({message:'Debe incluir accion a buscar'});}
    if (!fecha_desde) {res.status(400).json({message:'Debe incluir fecha_desde a buscar'});}

    const fechadesde = new Date(fecha_desde) 

    let evento_mqtt = await Eventos_mqtt.findOne({
        where: {
            updatedAt: {
            [Op.gte]: fechadesde,
         },
         accion: accion
        },
        order:[['updatedAt','DESC']],
    });

    if (!evento_mqtt){ return res.status(400).json({message: 'no se encuenta evento_mqtt'})}

    return res.status(200).json(evento_mqtt)


}

module.exports = {getUltimoEventoByAccion} 