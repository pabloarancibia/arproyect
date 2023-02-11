const {Trabajo} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers
const nuevoTrabajo = async (req, res)=>{
    try {
        const {nombre,descripcion} = req.body;
        const nuevoTrabajo = await Trabajo.create({
            nombre,descripcion
        });
        return res.status(200).json({
            message: 'Trabajo creado correctamente',
            nuevoTrabajo
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message,
            message: 'Error creando nuevo Trabajo'
        })
    }

}

const listarTrabajo = async (req, res)=>{
    try {
        const listadoTrabajos = await Trabajo.findAll({});
        
        return res.status(200).json({
            listadoTrabajos
        }); 

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error listando trabajos'
        })
    }
    
};

const getById = async (req, res)=>{
    try {
        const trabajo = await Trabajo.findOne({
            where: {id : req.params.TrabajoId}
        });
        return res.status(200).json({
            trabajo
        }); 
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error leyendo trabajo'
        })
    }
    
};

const editarTrabajo = async (req, res)=>{
    try {
        const TrabajoId=req.params.TrabajoId;
        const trabajoEditado = await Trabajo.update(req.body,{
            where: {
                id: TrabajoId
            }
        });

              
        return res.status(200).json({
            message: 'Trabajo editado correctamente'
        })
    } catch (error) {
         return res.status(400).json({
            error: error.message,
            message: 'Error editando trabajo'
        })
    }
}

const eliminarTrabajo = async (req, res) => {
    try {
        const TrabajoId = req.params.TrabajoId;
        const eliminar = await Trabajo.destroy(
            {
                where: {
                    id: TrabajoId
                }
            }
        );
        return res.status(200).json({
            message: 'Trabajo eliminado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error eliminando trabajo'
        });
    }
}


// Exports
module.exports = {nuevoTrabajo, listarTrabajo, editarTrabajo,eliminarTrabajo, getById}