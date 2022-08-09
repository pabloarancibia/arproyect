'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Repuestos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      medida: {
        type: DataTypes.INTEGER,
      },
      origen: {
        type: DataTypes.STRING,
      },
      marca: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Repuestos');
  }
};