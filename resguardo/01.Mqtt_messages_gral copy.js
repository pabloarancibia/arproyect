'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Mqtt_messages_gral', [
        {
            id:1,
            topic: 'nodo/discriminar',
            message: 'tarjeta:1, nodo:mostrador, estado:discriminar',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id:2,
            topic: 'nodo/cambiarestado',
            message: 'tarjeta:1, nodo:proceso, estado:proceso',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id:3,
            topic: 'nodo/cambiarestado',
            message: 'tarjeta:1, nodo:finalizado, estado:finalizado',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            id:4,
            topic: 'nodo/discriminar',
            message: 'tarjeta:1, nodo:mostrador, estado:discriminar',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Mqtt_messages_gral', [
        {
            id: [1,2,3,4],
        }
    ], {});
  }
};
