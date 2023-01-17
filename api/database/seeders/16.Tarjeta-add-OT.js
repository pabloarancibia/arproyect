'use strict';
const {Tarjeta} = require('../models/Tarjeta');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    for (let i=1;i==4;i++){
     await queryInterface.bulkUpdate('Tarjeta',
     {Orden_trabajoId: i,},{id:i,}
     )
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let i=1;i==4;i++){
      await queryInterface.bulkUpdate('Tarjeta',
      {Orden_trabajoId: null,},{id:i,}
      )
     }
  }
};
