'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Impresion_config', [
        {
            id: 1,
            orden_id: true,
            usuario: true,
            web: true,
            precio: true,
            entrega: true,
            trabajo: true,
            detalle: true,
            repuesto: true,
            marca: true,
            origen: true,
            observaciones: 'Configuración por defecto',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Impresion_config', [
       {id:1},
    ], {});
  }
};
