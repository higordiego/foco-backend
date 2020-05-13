'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('forms', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      documentation: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('forms')
  }
}
