'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Repuesto', [
        {
            nombre: 'Piston',
            medida: 75,
            marca: 'okinoi',
            origen: 'china',
            descripcion: 'alguna descripcion',
            cantidad: 20,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Camisa',
            medida: 0,
            marca: 'pirulin',
            origen: 'taiwan',
            descripcion: 'Lorem ipsim ',
            cantidad: 0,
            
            
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            nombre: 'Biela',
            medida: 0,
            marca: 'DKM',
            origen: 'Brasil',
            descripcion: 'Lorem ipsim mortum dae',
            cantidad: 20,
            
            
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
