/**
 * Rutas generales de la app
 */
const express = require("express");
const authRouter = express.Router();

//Middlewares

// Controllers

/** 
 * Routes
*/

authRouter.get('/', function (req,res){
    res.send('general routes --- Arancibia Rectificaciones API REST')
});

module.exports = authRouter;