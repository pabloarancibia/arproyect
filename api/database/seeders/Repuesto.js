'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Repuesto', [
        {
            RepuestoId: 1,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            RepuestoId: 2,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            RepuestoId: 3,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Repuesto', [
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
