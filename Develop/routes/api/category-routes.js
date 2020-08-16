const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Fill out the unfinished routes in product-routes.js, tag-routes.js, and category-routes.js to perform create, read, update, and delete operations using your Sequelize models.

// Be sure to look at your module project's code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    //Code 200 is OK
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      //Code 400 - unable to process
      res.status(400).json(err);
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Product.destroy({
    where: {
      category_id: req.params.id,
    },
  }).then(() => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((categoryData) => {
        if (!categoryData) {
          //Code 404 - 404: You're drunk- try again
          res.status(404).json({ message: "Unknown category" });
          return;
        }
        res.json(categoryData);
      })
      .catch((err) => {
        //500:: generic "catch-all" response
        res.status(500).json(err);
        console.log(err);
      });
  });
});

module.exports = router;
