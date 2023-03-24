'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Cliente', [
        {
            id: 1,
            nombre: 'Cliente 1',
            apellido: 'Prueba 1',
            celular: '3624101031',
            dni:13072231,
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'Cliente 2',
            apellido: 'Prueba 2',
            dni:23072232,
            celular: '3624101031',
            RolId:3,
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            id: 3,
            nombre: 'Cliente 3',
            apellido: 'Prueba 3',
            celular: '3624101031',
            dni:33072233,
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
