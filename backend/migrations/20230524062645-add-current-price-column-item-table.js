'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async t => {
      return [(
        await queryInterface.addColumn("items", "current_price", {
          type: Sequelize.DataTypes.DECIMAL(17, 5),
          allowNull: false,
          defaultValue: 0
        }, {transaction: t})
      )];
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(async t => {
      return [(
        await queryInterface.removeColumn("items", "current_price", { transaction: t })
      )];
    });
  }
};
