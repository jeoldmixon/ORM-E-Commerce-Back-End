const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {}

Tag.init(
  {
    // define columns see book work models folder
    id: {
      // Integer
      type: DataTypes.INTEGER,
      // Doesn't allow null values
      allowNull: false,
      // Set as primary key
      primaryKey: true,
      // Uses auto increment
      autoIncrement: true,
    },
    tag_name: {
      // String
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
