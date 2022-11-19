'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Impresion_config', {
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
        type: Sequelize.BOOLEAN
      },
      usuario: { 
        type: Sequelize.BOOLEAN
      },
      web: { 
        type: Sequelize.BOOLEAN
      },
      precio: { 
        type: Sequelize.BOOLEAN
      },
      entrega: { 
        type: Sequelize.BOOLEAN
      },
      trabajo: { 
        type: Sequelize.BOOLEAN
      },
      detalle: { 
        type: Sequelize.BOOLEAN
      },
      repuesto: { 
        type: Sequelize.BOOLEAN
      },
      marca: { 
        type: Sequelize.BOOLEAN
      },
      origen: { 
        type: Sequelize.BOOLEAN
      },
      observaciones: { 
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
    await queryInterface.dropTable('Impresion_config');
  }
};