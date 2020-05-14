
module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define('action', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    amount: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }

  }, { paranoid: true })

  return action
}
