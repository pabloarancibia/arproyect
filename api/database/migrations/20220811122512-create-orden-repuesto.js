'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orden_Repuesto', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrdenId: {
        type: Sequelize.INTEGER,
        references: {model: 'Orden_trabajo', key: 'id'}
      },
      RepuestoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Repuesto', key: 'id'}
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      repuesto_en_stock: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Orden_Repuesto');
  }
};