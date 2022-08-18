'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rol', [
        {
            nombre: 'administrador',
            descripcion: 'administrador root del sistema',
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'usuario',
            descripcion: 'usuario que usará el sistema',
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'cliente',
            descripcion: 'cliente de la empresa',
            
            
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
