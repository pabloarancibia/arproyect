const {Repuesto, Origen} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers
const nuevoRepuesto = async (req, res)=>{
    try {
        const {nombre,medida,marca,descripcion,cantidad,OrigenId} = req.body;
        const nuevoRepuesto = await Repuesto.create({
            nombre,medida,marca,descripcion,cantidad,OrigenId
        });
        return res.status(200).json({
            message: 'Repuesto creado correctamente',
            nuevoRepuesto
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message,
            message: 'Error creando nuevo Repuesto'
        })
    }

}

const listarRepuesto = async (req, res)=>{
    try {

        const listadoRepuestos = await Repuesto.findAll(
            {
                include: {
                    model:Origen,
                    attributes: ['id', 'pais','descripcion']
                }
            }
        );
        
        return res.status(200).json({
            listadoRepuestos
        }); 

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error listando repuestos'
        })
    }
    
};

const getById = async (req, res)=>{
    try {
        const repuesto = await Repuesto.findOne({
            where: {id : req.params.RepuestoId},
            include: {
                model:Origen,
                attributes: ['id', 'pais','descripcion']
            }
        });
        return res.status(200).json({
            repuesto
        }); 
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error leyendo repuesto'
        })
    }
    
};

const editarRepuesto = async (req, res)=>{
    try {
        const RepuestoId=req.params.RepuestoId;
        const repuestoEditado = await Repuesto.update(req.body,{
            where: {
                id: RepuestoId
            }
        });

              
        return res.status(200).json({
            message: 'Repuesto editado correctamente'
        })
    } catch (error) {
         return res.status(400).json({
            error: error.message,
            message: 'Error editando repuesto'
        })
    }
}

const eliminarRepuesto = async (req, res) => {
    try {
        const RepuestoId = req.params.RepuestoId;
        const eliminar = await Repuesto.destroy(
            {
                where: {
                    id: RepuestoId
                }
            }
        );
        return res.status(200).json({
            message: 'Repuesto eliminado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error eliminando repuesto'
        });
    }
}


// Exports
module.exports = {nuevoRepuesto, listarRepuesto, editarRepuesto,eliminarRepuesto, getById}