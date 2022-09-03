const {mqtt_messages_gral} = require('../database/models/index');

const { Op } = require("sequelize");
const Sequelize = require('sequelize')

/**
 * Guarda msg mqtt recibido en tabla mqtt_messages_gral
 * luego llama a funcion correspondiente según topic recibido
 * @param {*} topic 
 * @param {*} message 
 * @param {*} res 
 */
const receiveMessage = async (topic, message, res) => {
    const newMessage = await mqtt_messages_gral.create({
        topic, message
    });

    // callback según topic recibido
        // msg test
    //if (topic == 'esp/test'){
        testMessage(topic, message);
    //}
        // msg cambio estado
        // msg notificación
        // msg configuración

    // ** dentro de cada callback se realiza en res a mqtt broker
}

/**
 * Procesa topic esp/test
 * muestra el mensaje en consola
 * devuelve un pub informando la recepción al broker
 * @param {*} topic 
 * @param {*} message 
 */
function testMessage (topic, message){
    console.log('Topic: '+topic+' Mensaje: '+message);

    // publisher response
}

/**
 * Procesa topic 
 * guarda/actualiza el estado del producto
 * devuelve un pub informando la recepción al broker
 * @param {*} topic 
 * @param {*} message 
 */
 function estadoMessage (topic, message){
    console.log('Topic: '+topic+' Mensaje: '+message);

    // save/update db tabajo_estado

    // publisher response
}

module.exports = {receiveMessage};

