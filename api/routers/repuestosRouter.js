/**
 * Rutas para Repuestos
 */

const express = require("express");
const repuestosRouter = express.Router();

// Controllers
const repuestosCtrl = require('../controllers/repuestosController');
 
/** 
 * Routes
*/

repuestosRouter.get('/', function (req,res){
    res.send('Repuestos routes --- Arancibia Rectificaciones API REST')
});

repuestosRouter.post('/nuevo', repuestosCtrl.nuevoRepuesto);

repuestosRouter.get('/listar', repuestosCtrl.listarRepuesto);

repuestosRouter.get('/:RepuestoId', repuestosCtrl.getById);

repuestosRouter.put('/editar/:RepuestoId', repuestosCtrl.editarRepuesto);

repuestosRouter.delete('/eliminar/:RepuestoId', repuestosCtrl.eliminarRepuesto);



module.exports = repuestosRouter;

