const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grades', {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'courses',
        key: '_id'
      }
    },
    assignment_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    document_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grades',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "grades_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
