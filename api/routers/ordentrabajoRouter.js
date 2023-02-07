/**
 * Rutas para los trabajos de la empresa
 * obtener registros sobre los trabajos realizados
 */
 const express = require("express");
 const ordentrabajoRouter = express.Router();
 
 //Middlewares
 
 // Controllers
 const ordentrabajoCtrl = require('../controllers/ordentrabajoController');
 
 /** 
  * Routes
 */
 
 ordentrabajoRouter.get('/', function (req,res){
     res.send('ordenes de trabajo routes --- Arancibia Rectificaciones API REST')
 });

 /**
  * Traer todas las ordenes trabajo existentes
  */
 ordentrabajoRouter.get('/todas',
    ordentrabajoCtrl.getOrdenesTrabajo);

    /**
     * 
     * Traer ordenes trabajo por filtro
     * @params fecha_desde, fecha_hasta, estado.
     * @example http://localhost:3001/ordentrabajo/filtrado/fecha_desde/2022-08-19/fecha_hasta/estado/Espera
     */
    ordentrabajoRouter.get('/filtrado/fecha_desde/:fecha_desde?/fecha_hasta/:fecha_hasta?/estado/:estado?',
        ordentrabajoCtrl.getOrdenTrabajoBy);

    /**
     * Traer ordenes de trabajo por dni de cliente
     * @params dni_cliente
     */
    ordentrabajoRouter.get('/cliente/:dni_cliente',
        ordentrabajoCtrl.getOrdenTrabajoByCliente);

    /**
     * Nueva orden de trabajo
     * @params data, estado = espera
     * Recibe datos para la orden de trabajo
     * incluido el número de tarjeta rfid
     */
    ordentrabajoRouter.post('/nueva',
        ordentrabajoCtrl.nuevaOrdenTrabajo);

    /**
     * Cambiar estado orden de trabajo y [tarjeta]
     * @params id_orden, precio, saldo, detalle, estado(OT)
     * [TarjetaId][TarjetaEstado]
     * Si se recibe TarjetaId y TarjetaEstado se cambia el mismo
     */
     ordentrabajoRouter.put('/cambiarestado/:id_orden',
        ordentrabajoCtrl.retirarOrdenTrabajo);
 
 module.exports = ordentrabajoRouter;