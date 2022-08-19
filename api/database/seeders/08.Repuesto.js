'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Repuesto', [
        {
            id: 1,
            nombre: 'Piston',
            medida: 75,
            marca: 'okinoi',
            origen: 1,
            descripcion: 'alguna descripcion',
            cantidad: 20,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'Camisa',
            medida: 0,
            marca: 'pirulin',
            origen: 2,
            descripcion: 'Lorem ipsim ',
            cantidad: 0,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            nombre: 'Biela',
            medida: 0,
            marca: 'DKM',
            origen: 3,
            descripcion: 'Lorem ipsim mortum dae',
            cantidad: 20,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Repuesto', [
      {
        id: [1,2,3],
    }
    ], {});
  }
};
