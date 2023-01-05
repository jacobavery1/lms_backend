const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('submitted_documents', {
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
    document_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    document_link: {
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
    tableName: 'submitted_documents',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "submitted_documents_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
