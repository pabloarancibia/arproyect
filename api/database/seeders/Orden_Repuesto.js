'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Orden_Repuesto', [
        {
            OrdenId: 1,
            RepuestoId: 1,
            repuesto_en_stock: true,

            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            OrdenId: 2,
            RepuestoId: 2,
            repuesto_en_stock: true,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            OrdenId: 3,
            RepuestoId: 3,
            repuesto_en_stock: false,
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Orden_Repuesto', [
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
