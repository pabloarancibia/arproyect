'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Usuario', [
        {
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
       {nombreusuario: 'pabloarancibia'},
       {nombreusuario: 'miguelarancibia'},
        {nombreusuario: 'maricasco'}
    ], {});
  }
};
