'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Registro_Cambios_Estado', [
        {
            id: 1,
            EstadoId: 1,
            Orden_trabajoId: 1,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            EstadoId: 1,
            Orden_trabajoId: 2,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            EstadoId: 1,
            Orden_trabajoId: 3,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Registro_Cambios_Estado', [
      {
        id: [1,2,3],
    }
    ], {});
  }
};
