const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// Fill out the unfinished routes in product-routes.js, tag-routes.js, and category-routes.js to perform create, read, update, and delete operations using your Sequelize models.

// Be sure to look at your module project's code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
      },
      // 2 objects for category & tag
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    //200 OK status- all good
    .then((productData) => res.status(200).json(productData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((productData) => res.status(200).json(productData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds,
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      //200 OK- all good
      res.status(200).json(product);
    })
    // 200 OK- all good
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(
    {
      //req body archtype blank: blank.body.Whatever_whatever
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tagIds,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      //promise returns data-- seek and destroy
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      //Code 400 - unable to process
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete one product by its `id` value
  //destroy where params = id
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((productData) => {
      if (!productData) {
        //Code 404 - not found- try again- you're drunk go home
        res.status(404).json({ message: "Invalid Product ID" });
        return;
      }
      res.json(productData);
    })
    .catch((err) => {
      //500 generic "catch-all" response
      res.status(500).json(err);
      console.log(err);
    });
});

module.exports = router;
