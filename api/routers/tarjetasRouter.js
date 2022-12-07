/**
 * Rutas para tarjetas magneticas
 */

 const express = require("express");
 const tarjetasRouter = express.Router();

 //Middlewares
 
 // Controllers
 const tarjetasCtrl = require('../controllers/tarjetasController');
 
 /** 
  * Routes
 */
 
  tarjetasRouter.get('/', function (req,res){
    res.send('tarjetas routes --- Arancibia Rectificaciones API REST')
});

/**
 * traer ultima tarjeta por estado
 * ej: última nueva.
 * Recibe estado.
*/
  tarjetasRouter.get('/ultima/estado/:estado/fecha_desde/:fecha_desde',
    tarjetasCtrl.getUltimaTarjetaByEstado);

  module.exports = tarjetasRouter;
