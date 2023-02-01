'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Trabajo', [
        {
          id: 1,  
          nombre: 'Rectificación',
            descripcion: 'Rectificación de cilindro',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
          id: 2,  
            nombre: 'Encamisado',
            descripcion: 'Encamisado de cilindro',
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        {
          id: 3,
            nombre: 'Cambio de Biela',
            descripcion: 'Cambio de biela y centrado de cigüenial',
            createdAt: new Date(),
            updatedAt: new Date() 
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete(
      'Trabajo',
       {
        nombre: [
          'Rectificación',
          'Encamisado',
          'Cambio de Biela'
        ]
       });
  }
};
