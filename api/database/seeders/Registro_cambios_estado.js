'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Registro_cambios_estado', [
        {
            EstadoId: 1,
            Orden_trabajoId: 1,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            EstadoId: 1,
            Orden_trabajoId: 2,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            EstadoId: 1,
            Orden_trabajoId: 3,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Registro_cambios_estado', [
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
