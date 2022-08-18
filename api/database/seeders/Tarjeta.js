'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rol', [
        {
            numero: 1111,
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            numero: 1112,
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            numero: 1113,
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            numero: 1114,
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 4,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Rol', [
       {id:1},
       {id:2},
       {id:3},
       {id:4},
    ], {});
  }
};
