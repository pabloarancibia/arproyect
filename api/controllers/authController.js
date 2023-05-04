const { Usuario, Rol } = require('../database/models/index');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

/**
 * @method signIn
 * @description 
 * Logueo de usuarios
 * @returns nombreusuario, nombrerol y Token
 */
const signIn = (req, res) => {
    //Creamos el token
    let { nombreusuario, password } = req.body;
    let token = jwt.sign({ Usuario: nombreusuario }, authConfig.secret, {
        expiresIn: authConfig.expires
    });

    res.json({
        Usuario: nombreusuario,
        token: token
    })

    //let { nombreusuario, password } = req.body;
    // Buscar usuario
    // Usuario.findOne({
    //     where: {
    //         nombreusuario: nombreusuario
    //     },
    //     include:[{
    //         model:Rol,
    //         attributes: ['nombrerol']

    //     }]
    // }).then(Usuario => {

    //     if (!Usuario) {
    //         res.status(404).json({ message: "Usuario no encontrado" });
    //     } else {

    //         // Comparo contraseña
    //         if (bcrypt.compareSync(password, Usuario.password)) {

    //             // Creamos el token
    //             let token = jwt.sign({ Usuario: Usuario }, authConfig.secret, {
    //                 expiresIn: authConfig.expires
    //             });

                
    //             // Preparo los datos a devolver
    //             let UserObj = {
    //                 nombreusuario: Usuario.nombreusuario,
    //                 Rol: {
    //                     nombrerol: Usuario.Rol.nombrerol
    //                 }
    //             };

    //             // devuelvo datos 
    //             res.json({
    //                 Usuario: UserObj,
    //                 token: token
    //             })

    //         } else {

    //             // Unauthorized Access
    //             res.status(401).json({ message: "Contraseña incorrecta" })
    //         }

    //     }

    // }).catch(err => {
    //     res.status(500).json(err);
    // })
}
module.exports = { signIn };