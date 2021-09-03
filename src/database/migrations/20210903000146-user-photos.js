'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'photo_id', {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: queryInterface => {
    return queryInterface.dropTable('users', 'photo_id');
  }
};
