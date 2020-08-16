// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
// category refs file for import
const Category = require("./Category");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
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
    product_name: {
      // String
      type: DataTypes.STRING,
      // Doesn't allow null values
      allowNull: false,
    },
    price: {
      // Decimal
      type: DataTypes.DECIMAL,
      // Doesn't allow null values
      allowNull: false,
      validate: {
        // Validates that the value is a decimal
        isDecimal: true,
      },
    },
    stock: {
      // Integer
      type: DataTypes.INTEGER,
      // Doesn't allow null values
      allowNull: false,
      // Set a default value of 10
      defaultValue: 10,
      validate: {
        // Validates that the value is numeric
        isNumeric: true,
      },
    },
    category_id: {
      // Integer
      type: DataTypes.INTEGER,
      // References the category model's id
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
