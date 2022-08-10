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
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Orden_trabajo', [
       {nombre:'Rectificación'},
       {nombre: 'Encamisado'},
        {nombre: 'Cambio de Biela'}
    ], {});
  }
};
