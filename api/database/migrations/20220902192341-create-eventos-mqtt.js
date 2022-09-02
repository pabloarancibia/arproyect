'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventos_mqtts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tarjeta: {
        type: Sequelize.STRING
      },
      accion: {
        type: Sequelize.STRING
      },
      estado_tarjeta: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('eventos_mqtts');
  }
};