
module.exports = (sequelize, DataTypes) => {
  const form = sequelize.define('form', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    documentation: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  }, { paranoid: true })

  return form
}
