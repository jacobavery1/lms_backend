const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('submissions', {
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true
    },
    assignment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'assignments',
        key: '_id'
      }
    },
    student_uuid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'students',
        key: '_id'
      }
    },
    submission_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    submission_text_html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'courses',
        key: '_id'
      }
    }
  }, {
    sequelize,
    tableName: 'submissions',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "submissions_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
