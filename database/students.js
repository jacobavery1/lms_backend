const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    student_password: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    courses: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'students',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "students_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
