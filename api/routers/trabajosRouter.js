/**
 * Rutas para tipo de Trabajos
 */

const express = require("express");
const trabajosRouter = express.Router();

// Controllers
const trabajosCtrl = require('../controllers/trabajosController');
 
/** 
 * Routes
*/

trabajosRouter.get('/', function (req,res){
    res.send('Trabajos routes --- Arancibia Rectificaciones API REST')
});

trabajosRouter.post('/nuevo', trabajosCtrl.nuevoTrabajo);

trabajosRouter.get('/listar', trabajosCtrl.listarTrabajo);

trabajosRouter.get('/:TrabajoId', trabajosCtrl.getById);

trabajosRouter.put('/editar/:TrabajoId', trabajosCtrl.editarTrabajo);

trabajosRouter.delete('/eliminar/:TrabajoId', trabajosCtrl.eliminarTrabajo);



module.exports = trabajosRouter;

