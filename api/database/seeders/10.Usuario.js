'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Usuario', [
        {
            id: 1,
            nombre: 'Pablo',
            apellido: 'Arancibia',
            celular: '3624101031',
            nombreusuario: 'pabloarancibia',
            password: '123456',
            RolId:1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            nombre: 'Miguel',
            apellido: 'Arancibia',
            celular: '3624101031',
            nombreusuario: 'miguelarancibia',
            password: '123456',
            RolId:2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 3,
            nombre: 'Maria',
            apellido: 'Casco',
            celular: '3624101031',
            nombreusuario: 'maricasco',
            password: '123456',
            RolId:2,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Usuario', [
      {
        id: [1,2,3],
    }
    ], {});
  }
};
