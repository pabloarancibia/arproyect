const {Cliente} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers
const nuevoCliente = async (req, res)=>{
    try {
        const {nombre, apellido, dni, celular, RolId} = req.body;
        const nuevoCliente = await Cliente.create({
            nombre, apellido, dni, celular, RolId
        });
        return res.status(200).json({
            message: 'Cliente creado correctamente',
            nuevoCliente
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message,
            message: 'Error creando nuevo Cliente'
        })
    }

}

const listarCliente = async (req, res)=>{
    try {
        const listadoClientes = await Cliente.findAll();
        return res.status(200).json({
            listadoClientes
        }); 
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error listando clientes'
        })
    }
    
};

const getById = async (req, res)=>{
    try {
        const cliente = await Cliente.findOne({
            where: {id : req.params.ClienteId}
        });
        return res.status(200).json({
            cliente
        }); 
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error leyendo cliente'
        })
    }
    
};

const editarCliente = async (req, res)=>{
    try {
        const ClienteId=req.params.ClienteId;
        const clienteEditado = await Cliente.update(req.body,{
            where: {
                id: ClienteId
            }
        });

              
        return res.status(200).json({
            message: 'Cliente editado correctamente'
        })
    } catch (error) {
         return res.status(400).json({
            error: error.message,
            message: 'Error editando cliente'
        })
    }
}

const eliminarCliente = async (req, res) => {
    try {
        const ClienteId = req.params.ClienteId;
        const eliminar = await Cliente.destroy(
            {
                where: {
                    id: ClienteId
                }
            }
        );
        return res.status(200).json({
            message: 'Cliente eliminado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error eliminando cliente'
        });
    }
}


// Exports
module.exports = {nuevoCliente, listarCliente, editarCliente,eliminarCliente, getById}