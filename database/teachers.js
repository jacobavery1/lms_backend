const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teachers', {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true
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
    teacher_password: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    courses: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'teachers',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "teachers_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
