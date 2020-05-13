
module.exports = (sequelize, DataTypes) => {
  const candidate = sequelize.define('candidate', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    birthday: {
      type: DataTypes.DATEONLY(),
      allowNull: false
    },

    CPF: {
      type: DataTypes.STRING(15),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    phone: {
      type: DataTypes.STRING(17),
      allowNull: false
    },

    accept: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }

  }, { paranoid: true })

  return candidate
}
