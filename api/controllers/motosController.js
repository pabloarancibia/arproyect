const {Moto} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers
const nuevaMoto = async (req, res)=>{
    try {
        const {marca,modelo,cilindrada,anio,observaciones} = req.body;
        const nuevoMoto = await Moto.create({
            marca,modelo,cilindrada,anio,observaciones
        });
        return res.status(200).json({
            message: 'Moto creada correctamente',
            nuevoMoto
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message,
            message: 'Error creando nuevo Moto'
        })
    }

}

const listarMoto = async (req, res)=>{
    try {
        const listadoMotos = await Moto.findAll({});
        
        return res.status(200).json({
            listadoMotos
        }); 

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error listando motos'
        })
    }
    
};

const getById = async (req, res)=>{
    try {
        const moto = await Moto.findOne({
            where: {id : req.params.MotoId}
        });
        return res.status(200).json({
            moto
        }); 
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error leyendo moto'
        })
    }
    
};

const editarMoto = async (req, res)=>{
    try {
        const MotoId=req.params.MotoId;
        const motoEditado = await Moto.update(req.body,{
            where: {
                id: MotoId
            }
        });

              
        return res.status(200).json({
            message: 'Moto editada correctamente'
        })
    } catch (error) {
         return res.status(400).json({
            error: error.message,
            message: 'Error editando moto'
        })
    }
}

const eliminarMoto = async (req, res) => {
    try {
        const MotoId = req.params.MotoId;
        const eliminar = await Moto.destroy(
            {
                where: {
                    id: MotoId
                }
            }
        );
        return res.status(200).json({
            message: 'Moto eliminada correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error eliminando moto'
        });
    }
}


// Exports
module.exports = {nuevaMoto, listarMoto, editarMoto,eliminarMoto, getById}