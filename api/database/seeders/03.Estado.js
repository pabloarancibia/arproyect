'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Estado', [
        {
            id: 1,
            nombre: 'En Espera',
            detalle: 'Trabajo en espera de ser procesado',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'En Proceso',
            detalle: 'Trabajo en proceso',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 3,
            nombre: 'Finalizado',
            detalle: 'Trabajo finalizado, disponible para retirar',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 4,
            nombre: 'Retirado',
            detalle: 'Trabajo retirado por el cliente',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 5,
            nombre: 'Libre',
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
