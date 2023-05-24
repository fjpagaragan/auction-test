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
        await queryInterface.createTable('deposits', {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          user_id: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: {
                tableName: "users"
              },
              key: "id"
            },
            unique: true,
            allowNull: false
          },
          amount: {
            type: Sequelize.DataTypes.DECIMAL(17, 5),
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          }, 
        })
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
    await queryInterface.dropTable('deposits');
  }
};
