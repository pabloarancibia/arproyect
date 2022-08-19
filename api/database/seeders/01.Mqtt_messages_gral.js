'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Mqtt_messages_gral', [
        {
            id:1,
            topic: 'esp32/espera',
            message: 'tarjeta:1, estado:espera',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id:2,
            topic: 'esp32/en_proceso',
            message: 'tarjeta:1, estado:en_proceso',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id:3,
            topic: 'esp32/finalizado',
            message: 'tarjeta:1, estado:finalizado',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Mqtt_messages_gral', [
        {
            id: [1,2,3],
        }
    ], {});
  }
};
