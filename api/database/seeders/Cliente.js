'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Cliente', [
        {
            nombre: 'Ramon',
            apellido: 'Comodoro',
            celular: '3624101010',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Jose',
            apellido: 'Gomez',
            celular: '3624101010',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            nombre: 'David',
            apellido: 'Lopez',
            celular: '3624101010',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date() 
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Cliente', [
       {nombre:'Ramon'},
       {nombre: 'Jose'},
        {nombre: 'David'}
    ], {});
  }
};
