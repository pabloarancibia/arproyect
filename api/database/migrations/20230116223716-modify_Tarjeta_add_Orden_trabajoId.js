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
        queryInterface.addColumn('Tarjeta', 'OrdenTrabajoId', {
          type: Sequelize.INTEGER,
          references: {model: 'OrdenTrabajo', key: 'id'}

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
        queryInterface.removeColumn('Tarjeta', 'OrdenTrabajoId', { transaction: t }),
      ]);
    });
  }
};
