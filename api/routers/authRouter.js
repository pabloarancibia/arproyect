/**
 * Rutas para manejo de autenticación.
 */
const express = require("express");
const authRouter = express.Router();

//Middlewares

// Controllers

/** 
 * Routes
*/

authRouter.get('/', function (req,res){
    res.send('auth routes')
});

module.exports = authRouter;