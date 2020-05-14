
module.exports = (sequelize, DataTypes) => {
  const submission = sequelize.define('submission', {
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

  return submission
}
