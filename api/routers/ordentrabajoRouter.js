/**
 * Rutas para los trabajos de la empresa
 * obtener registros sobre los trabajos realizados
 */
 const express = require("express");
 const trabajosRouter = express.Router();
 
 //Middlewares
 
 // Controllers
 const trabajosCtrl = require('../controllers/ordentrabajoController');
 
 /** 
  * Routes
 */
 
 trabajosRouter.get('/', function (req,res){
     res.send('ordenes de trabajo routes --- Arancibia Rectificaciones API REST')
 });

 /**
  * Traer todos los trabajos existentes
  */
 trabajosRouter.get('/todos',
    trabajosCtrl.getOrdenesTrabajo);
 
 module.exports = trabajosRouter;