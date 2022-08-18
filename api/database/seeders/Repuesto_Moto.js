'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Repuesto_Moto', [
        {
            RepuestoId: 1,
            MotoId: 1,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            RepuestoId: 2,
            MotoId: 2,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            RepuestoId: 3,
            MotoId: 3,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Repuesto_Moto', [
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
