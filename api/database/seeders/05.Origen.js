'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Origen', [
        {
            id: 1,
            pais: 'Argentina',
            descripcion: 'Nacional',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            pais: 'Brasil',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            pais: 'Taiwan',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 4,
            pais: 'Japon',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 5,
            pais: 'Otro',
            descripcion: 'otro',
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Origen', [
        {
            id: [1,2,3,4,5],
        }
    ], {});
  }
};
