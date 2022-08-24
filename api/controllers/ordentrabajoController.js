const {Orden_trabajo,Cliente, Estado, Moto, Trabajo, Usuario} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");

/**
 * 
 * @method getTrabajos 
 * @description
 * Traer todas las ordenes de trabajo existentes
 * @returns
 * listado de todas las ordenes de trabajos existentes
 */
const getOrdenesTrabajo = async (req, res)=>{
    const trabajo = await Orden_trabajo.findAll({
        include:[
            {model:Cliente},
            {model: Estado},
            {model: Moto},
            {model: Trabajo},
            {model: Usuario},
        ]
    });
    return res.json(trabajo)
}

module.exports = {getOrdenesTrabajo};