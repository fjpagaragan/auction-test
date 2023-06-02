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
        await queryInterface.createTable('bids', {
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
            allowNull: false
          },
          item_id: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: {
                tableName: "items"
              },
              key: "id"
            },
            allowNull: false
          },
          amount: {
            type: Sequelize.DataTypes.DECIMAL(17, 5),
            allowNull: false
          },
          status: {
            type: Sequelize.DataTypes.ENUM('Pending', 'Accepted', 'Refunded'),
            allowNull: false,
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
    await queryInterface.dropTable('bids');
  }
};
