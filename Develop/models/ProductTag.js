// Given- follow data type structure-
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns -- see book work models folder
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
    product_id: {
      // Integer
      type: DataTypes.INTEGER,
      // References the product model's id
      references: {
        // References the tag model's id
        model: "product",
        key: "id",
      },
    },
    tag_id: {
      // Integer
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
