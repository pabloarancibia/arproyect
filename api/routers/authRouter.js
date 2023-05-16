/**
 * Rutas para manejo de autenticación.
 */
const express = require("express");
const authRouter = express.Router();

//Middlewares

// Controllers
const authController = require('../controllers/authController');
 

/** 
 * Routes
*/

authRouter.get('/', function (req,res){
    res.send('auth routes')
});

authRouter.post('/login',authController.signIn);

module.exports = authRouter;