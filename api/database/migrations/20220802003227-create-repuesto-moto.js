'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Repuesto_Motos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RepuestoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Repuesto', key: 'id'}
      },
      MotoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Moto', key: 'id'}
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
    await queryInterface.dropTable('Repuesto_Motos');
  }
};