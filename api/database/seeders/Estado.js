'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Estado', [
        {
            nombre: 'En Espera',
            detalle: 'Trabajo en espera de ser procesado',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'En Proceso',
            detalle: 'Trabajo en proceso',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            nombre: 'Finalizado',
            detalle: 'Trabajo finalizado, disponible para retirar',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            nombre: 'Retirado',
            detalle: 'Trabajo retirado por el cliente',
            createdAt: new Date(),
            updatedAt: new Date() 
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Estado', [
        {nombre:'En Espera'},
       {nombre:'En Proceso'},
       {nombre: 'Finalizado'},
        {nombre: 'Retirado'}
    ], {});
  }
};
