const {Cliente, Rol} = require('../database/models/index');

const { Op, Sequelize } = require("sequelize");
const { response } = require('express');

// Controllers

/**
 * Crear nuevo cliente
 * recibe data por request body
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const nuevoCliente = async (req, res)=>{
    try {

        //busco el rolid de cliente
        const rol = await Rol.findOne(
            {
                where: {
                    nombre: {[Op.like]:'cliente'}

            }}
        )

        //const {nombre, apellido, dni, celular} = req.body;
        
        let nuevoCliente = await Cliente.create(
            //nombre:nombre, apellido:apellido, dni:dni, celular:celular, 
            req.body  
        );
        nuevoCliente.RolId = rol.id
        await nuevoCliente.save()

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
        const listadoClientes = await Cliente.findAll({
            include:{
                model: Rol,
                attributes: ['id','nombre', 'descripcion']
            }
        });
        
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
            where: {id : req.params.ClienteId},
            include:{
                model: Rol,
                attributes: ['id','nombre', 'descripcion']
            }
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

/**
 * Busqueda de Cliente por:
 * apellido, nombre o celular
 * @param {*} req 
 * @param {*} res 
 * @returns {clientes}
 */
const buscarCliente = async (req, res)=>{
    try {
        const {nombre, apellido,celular} = req.params;
        
        const busquedaClientes = await Cliente.findAll({
            where: {
                [Op.or]: [
                    { 'nombre': { [Op.like]: '%' + nombre + '%' } },
                    { 'apellido': { [Op.like]: '%' + apellido + '%' } },
                    { 'celular': { [Op.like]: '%' + celular + '%' } },
                  ]
            }
        });
        
        return res.status(200).json({
            res:busquedaClientes
        }); 

    } catch (error) {
        return res.status(400).json({
            error: error.message,
            message: 'Error buscando clientes'
        })
    }
    
};


// Exports
module.exports = {nuevoCliente, listarCliente, 
    editarCliente,eliminarCliente, getById, buscarCliente}