'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Impresion_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      observaciones: {
        type: Sequelize.STRING
      },
      orden_id: { 
        type: DataTypes.BOOLEAN
      },
      usuario: { 
        type: DataTypes.BOOLEAN
      },
      web: { 
        type: DataTypes.BOOLEAN
      },
      precio: { 
        type: DataTypes.BOOLEAN
      },
      entrega: { 
        type: DataTypes.BOOLEAN
      },
      trabajo: { 
        type: DataTypes.BOOLEAN
      },
      detalle: { 
        type: DataTypes.BOOLEAN
      },
      repuesto: { 
        type: DataTypes.BOOLEAN
      },
      marca: { 
        type: DataTypes.BOOLEAN
      },
      origen: { 
        type: DataTypes.BOOLEAN
      },
      observaciones: { 
        type: DataTypes.STRING
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
    await queryInterface.dropTable('Impresion_configs');
  }
};