'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Tarjeta', 'Orden_trabajoId', {
          type: Sequelize.INTEGER,
          references: {model: 'Orden_trabajo', key: 'id'}

        }, { transaction: t }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Tarjeta', 'Orden_trabajoId', { transaction: t }),
      ]);
    });
  }
};
