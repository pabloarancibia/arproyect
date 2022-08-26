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
 trabajosRouter.get('/todas',
    trabajosCtrl.getOrdenesTrabajo);

    /**
     * 
     * Traer orden trabajo por filtro
     * @params fecha_desde, fecha_hasta, estado.
     * @example http://localhost:3001/ordentrabajo/filtrado/fecha_desde/2022-08-19/fecha_hasta/estado/Espera
     */
    trabajosRouter.get('/filtrado/fecha_desde/:fecha_desde?/fecha_hasta/:fecha_hasta?/estado/:estado?',
    trabajosCtrl.getOrdenTrabajoBy);
 
 module.exports = trabajosRouter;