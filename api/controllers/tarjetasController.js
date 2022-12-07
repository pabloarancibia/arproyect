const {Tarjeta, Estado} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

/**
 * Devolver última tarjeta cargada según estado.
 * fecha desde indica desde que fecha y hora de updatedAt se debe buscar,
 * servirá para escanear una tarjeta para carga una nueva OT
 * @param {*} req estado, fecha_desde
 * @param {*} res tarjeta
 */
const getUltimaTarjetaByEstado = async (req, res)=>{
    let {estado,fecha_desde} = req.params;
    if (!estado) {res.status(400).json({message:'Debe incluir estado a buscar'});}
    if (!fecha_desde) {res.status(400).json({message:'Debe incluir fecha_desde a buscar'});}

    const fechadesde = new Date(fecha_desde) 

    let tarjeta = await Tarjeta.findOne({
        include: [{
            model: Estado,
            attributes: ['nombre'],
            where: {
                nombre:{
                    [Op.like]:'%'+estado+'%',
                }
            }
        }],
        where: {
            updatedAt: {
            [Op.gte]: fechadesde,
         }
        },
        order:[['updatedAt','DESC']],
    });

    if (!tarjeta){ return res.status(400).json({message: 'no se encuenta tarjeta'})}

    return res.status(200).json(tarjeta)


}

module.exports = {getUltimaTarjetaByEstado} 