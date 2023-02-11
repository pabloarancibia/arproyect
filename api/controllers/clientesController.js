const {Clientes} = require('../database/models/index');
const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers
const nuevoCliente = async (req, res)=>{
    try {
        const data = req.body;
        const nuevoCliente = await Clientes.create({
            data
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
        const listadoClientes = await Clientes.findAll();
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

const editarCliente = async (req, res)=>{
    try {
        const ClienteId=req.params.ClienteId;
        const clienteEditado = await Clientes.update(req.body,{
            where: {
                id: ClienteId
            }
        });
        
        return res.status(200).json({clienteEditado})
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
        const eliminar = await Clientes.delete(
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
module.exports = {nuevoCliente, listarCliente, editarCliente}