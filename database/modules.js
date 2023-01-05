const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modules', {
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
    course_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    module_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    display: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'modules',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "modules_pkey",
        unique: true,
        fields: [
          { name: "_id" },
        ]
      },
    ]
  });
};
