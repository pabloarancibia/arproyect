'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Motos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marca: {
        type: DataTypes.STRING
      },
      modelo: {
        type: DataTypes.STRING
      },
      cilindrada: {
        type: DataTypes.INTEGER
      },
      año: {
        type: DataTypes.INTEGER
      },
      observaciones: {
        type: DataTypes.STRING
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        default: true,
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
    await queryInterface.dropTable('Motos');
  }
};