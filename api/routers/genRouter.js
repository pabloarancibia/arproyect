/**
 * Rutas generales de la app
 */
const express = require("express");
const genRouter = express.Router();

//Middlewares

// Controllers

/** 
 * Routes
*/

genRouter.get('/', function (req,res){
    res.send('general routes --- Arancibia Rectificaciones API REST')
});

module.exports = genRouter;