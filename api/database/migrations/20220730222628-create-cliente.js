'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING,
      },
      celular: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      dni: {
        type: Sequelize.BIGINT,
        defaultValue: 0
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: "activo"
  
      },
      RolId:{
        type: Sequelize.INTEGER,
        references:{model:'Rol', key:'id'}
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cliente');
  }
};