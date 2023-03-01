'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('users', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.SRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.SRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.SRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.SRING,
      allowNull: false,
    }
   });
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('users')
  }
};
