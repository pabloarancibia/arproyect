'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Registro_Cambios_Estados', {
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
      Orden_trabajoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Orden_trabajo', key: 'id'}
      },
      fecha: {
        type: DataTypes.DATE
      },
      is_active: {
        type: DataTypes.BOOLEAN
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
    await queryInterface.dropTable('Registro_Cambios_Estados');
  }
};