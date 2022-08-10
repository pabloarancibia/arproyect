'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Trabajo', [
        {
            nombre: 'Rectificación',
            descripcion: 'Rectificación de cilindro',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Encamisado',
            descripcion: 'Encamisado de cilindro',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
            nombre: 'Cambio de Biela',
            descripcion: 'Cambio de biela y centrado de cigüeñal',
            createdAt: new Date(),
            updatedAt: new Date() 
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Trabajo', [
       {nombre:'Rectificación'},
       {nombre: 'Encamisado'},
        {nombre: 'Cambio de Biela'}
    ], {});
  }
};
