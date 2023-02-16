/**
 * Rutas para Clientes
 */

const express = require("express");
const clientesRouter = express.Router();

// Controllers
const clientesCtrl = require('../controllers/clientesController');
 
/** 
 * Routes
*/

clientesRouter.get('/', function (req,res){
    res.send('Clientes routes --- Arancibia Rectificaciones API REST')
});

clientesRouter.post('/nuevo', clientesCtrl.nuevoCliente);

clientesRouter.get('/listar', clientesCtrl.listarCliente);

clientesRouter.get('/buscar/nombre/:nombre?/apellido/:apellido?/celular/:celular?', clientesCtrl.buscarCliente);

clientesRouter.get('/:ClienteId', clientesCtrl.getById);

clientesRouter.put('/editar/:ClienteId', clientesCtrl.editarCliente);

clientesRouter.delete('/eliminar/:ClienteId', clientesCtrl.eliminarCliente);



module.exports = clientesRouter;

