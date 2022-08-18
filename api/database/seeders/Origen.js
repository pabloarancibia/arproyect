'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rol', [
        {
            pais: 'Argentina',
            descripcion: 'Nacional',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            pais: 'Brasil',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            pais: 'Taiwan',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            pais: 'Japon',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            pais: 'Otro',
            descripcion: 'otro',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Rol', [
       {id:1},
       {id:2},
       {id:3},
    ], {});
  }
};
