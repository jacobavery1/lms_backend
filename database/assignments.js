const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assignments', {
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
    module_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'modules',
        key: '_id'
      }
    },
    display: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    module_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    assignment_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    assigned_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    assignment_description_html: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'assignments',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "assignments_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
