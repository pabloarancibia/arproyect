/**
 * Rutas para Motos
 */

const express = require("express");
const motosRouter = express.Router();

// Controllers
const motosCtrl = require('../controllers/motosController');
 
/** 
 * Routes
*/

motosRouter.get('/', function (req,res){
    res.send('Motos routes --- Arancibia Rectificaciones API REST')
});

motosRouter.post('/nueva', motosCtrl.nuevaMoto);

motosRouter.get('/listar', motosCtrl.listarMoto);

motosRouter.get('/:MotoId', motosCtrl.getById);

motosRouter.put('/editar/:MotoId', motosCtrl.editarMoto);

motosRouter.delete('/eliminar/:MotoId', motosCtrl.eliminarMoto);



module.exports = motosRouter;

