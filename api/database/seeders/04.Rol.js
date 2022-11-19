'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rol', [
        {
            id: 1,
            nombre: 'administrador',
            descripcion: 'administrador root del sistema',
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          id: 2,
            nombre: 'usuario',
            descripcion: 'usuario que usará el sistema',
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          id: 3,
            nombre: 'cliente',
            descripcion: 'cliente de la empresa',
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Rol', [
      {
        id: [1,2,3],
    }
    ], {});
  }
};
