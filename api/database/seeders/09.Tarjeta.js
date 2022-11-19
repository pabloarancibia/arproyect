'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Tarjeta', [
        {
            id: 1,
            numero: '1111',
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            numero: '1112',
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            numero: '1113',
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            numero: '1114',
            descripcion: 'tarjeta de prueba falsa',
            EstadoId: 4,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Tarjeta', [
      {
        id: [1,2,3,4],
    }
    ], {});
  }
};
