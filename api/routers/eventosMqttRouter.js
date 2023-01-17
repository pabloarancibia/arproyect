const express = require("express");
const eventosMqttRouter = express.Router();

const eventosCtrl = require('../controllers/eventosController');

eventosMqttRouter.get('/', function(req,res){
    res.send('Eventos Mqtt Router Ok')
})

/**
 * Traer útlimo evento por acción
 * accion: nueva
 * fecha_desde: 2022-09-05T00:30:00Z
 */
eventosMqttRouter.get('/ultimo/accion/:accion/fecha_desde/:fecha_desde',
eventosCtrl.getUltimoEventoByAccion)

module.exports = eventosMqttRouter;
