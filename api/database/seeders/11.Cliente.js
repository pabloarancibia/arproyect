'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Cliente', [
        {
            id: 1,
            nombre: 'Ramon',
            apellido: 'Comodoro',
            celular: '3624101010',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'Jose',
            apellido: 'Gomez',
            celular: '3624101010',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 3,
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
      {
        id: [1,2,3],
    }
    ], {});
  }
};
