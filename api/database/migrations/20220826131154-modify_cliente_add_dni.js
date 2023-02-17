'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Cliente', 'dni', {
          type: Sequelize.DataTypes.BIGINT,
          defaultValue: 0,

        }, { transaction: t }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Cliente', 'dni', { transaction: t }),
      ]);
    });
  }
};
