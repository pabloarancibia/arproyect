'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Registro_cambios_estado', [
        {
            OrdenId: 1,
            RepuestoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            OrdenId: 2,
            RepuestoId: 2,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            OrdenId: 3,
            RepuestoId: 3,
            
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
