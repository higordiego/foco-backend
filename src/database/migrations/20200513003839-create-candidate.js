'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidates', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },

      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      birthday: {
        type: Sequelize.DATEONLY(),
        allowNull: false
      },

      CPF: {
        type: Sequelize.STRING(15),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING(17),
        allowNull: false
      },

      accept: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('candidates')
  }
}
