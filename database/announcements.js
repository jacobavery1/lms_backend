const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('announcements', {
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
    sender_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'teachers',
        key: '_id'
      }
    },
    announcement_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    announcement_title: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    announcement_text_html: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'announcements',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "announcements_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
