'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registro_Cambios_Estado', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EstadoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Estado', key: 'id'}
      },
      OrdenTrabajoId: {
        type: Sequelize.INTEGER,
        references: {model: 'OrdenTrabajo', key: 'id'}
      },
      fecha: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Registro_Cambios_Estado');
  }
};