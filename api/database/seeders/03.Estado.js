'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Estado', [
        {
            id: 1,
            nombre: 'espera',
            detalle: 'Trabajo en espera de ser procesado',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'proceso',
            detalle: 'Trabajo en proceso',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 3,
            nombre: 'finalizado',
            detalle: 'Trabajo finalizado, disponible para retirar',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 4,
            nombre: 'retirado',
            detalle: 'Trabajo retirado por el cliente',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 5,
            nombre: 'libre',
            detalle: 'Tarjeta libre para uso',
            createdAt: new Date(),
            updatedAt: new Date() 
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Estado', [
        {
            id: [1,2,3,4,5],
        }
    ], {});
  }
};
