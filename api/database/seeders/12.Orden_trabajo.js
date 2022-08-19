'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Orden_trabajo', [
        {
            id: 1,
            TrabajoId: 1,
            EstadoId: 1,
            ClienteId: 1,
            UsuarioId: 1,
            MotoId: 1,
            precio: 1500,
            entrega: 750,
            fecha_entrega_estimada: new Date(),
            detalle: 'busca por la noche 21hs',
            tarjeta: '1111',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            TrabajoId: 2,
            EstadoId: 1,
            ClienteId: 2,
            UsuarioId: 1,
            MotoId: 2,
            precio: 5000,
            entrega: 2500,
            fecha_entrega_estimada: new Date(),
            detalle: 'dar prioridad a este trabajo',
            tarjeta: '1112',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            TrabajoId: 3,
            EstadoId: 1,
            ClienteId: 3,
            UsuarioId: 1,
            MotoId: 3,
            precio: 3500,
            entrega: 1750,
            fecha_entrega_estimada: new Date(),
            detalle: 'busca primera hora de la tarde',
            tarjeta: '1113',
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Orden_trabajo', [
      {
        id: [1,2,3],
    }
    ], {});
  }
};
