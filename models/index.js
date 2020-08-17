// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

//Book work- Model folder index.js file

// Products belongsTo Category
// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
// Category has many Product models.
Category.hasMany(Product, {
  foreignKey: "category_id",
});
// Products belongToMany Tags (through ProductTag)
// Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
// Tag belongs to many Product models.
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
