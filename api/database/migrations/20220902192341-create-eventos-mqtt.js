'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eventos_mqtt', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TarjetaId: {
        type: Sequelize.INTEGER,
        references: {model: 'Tarjeta', key: 'id'}
      },
      Orden_trabajoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Orden_trabajo', key: 'id'}
      },
      accion: {
        type: Sequelize.STRING
      },
      nodo: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Eventos_mqtt');
  }
};