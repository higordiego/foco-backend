
module.exports = (sequelize, DataTypes) => {
  const candidateAction = sequelize.define('candidate_action', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    CandidateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    ActionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }

  }, { paranoid: true })

  return candidateAction
}
