'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Moto', [
        {
            id: 1,
            marca: 'Honda',
            modelo: 'CG Titán',
            cilindrada:150,
            año: 2010,
            observaciones:'modelo viejo, no es la new titan. 2000-2013',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            marca: 'Yamaha',
            modelo: 'YBR',
            cilindrada:250,
            año: 2010,
            observaciones:' ',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            marca: 'Guerrero',
            modelo: 'Smash',
            cilindrada:110,
            año: 2000,
            observaciones:' ',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Moto', [
        {
            id: [1,2,3],
        }
    ], {});
  }
};
