'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Orden_trabajo', [
        {
            Trabajo: 1,
            Estado: 1,
            Cliente: 1,
            Usuario: 1,
            Moto: 1,
            precio: 1500,
            entrega: 750,
            fecha_entrega_estimada: new Date(),
            detalle: 'busca por la noche 21hs',
            tarjeta: '1111',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            Trabajo: 2,
            Estado: 1,
            Cliente: 2,
            Usuario: 1,
            Moto: 2,
            precio: 5000,
            entrega: 2500,
            fecha_entrega_estimada: new Date(),
            detalle: 'dar prioridad a este trabajo',
            tarjeta: '1112',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            Trabajo: 3,
            Estado: 1,
            Cliente: 3,
            Usuario: 1,
            Moto: 3,
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
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
