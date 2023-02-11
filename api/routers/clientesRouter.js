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

clientesRouter.put('/editar/:ClienteId', clientesCtrl.editarCliente);

clientesRouter.delete('/eliminar/:ClienteId', clientes.eliminarCliente);



module.exports = clientesRouter;

