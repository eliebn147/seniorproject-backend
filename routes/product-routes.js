const express = require("express");
const router = express.Router();

const ProductModel = require("../models/ProductModel.js");

router.post(
  "/create", // http://www.benjamin.com/products/
  function (req, res) {
    const document = {
      name: req.body.name.toLowerCase(),
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
    };

    ProductModel.findOne({ name: document.name }).then(function (dbDocument) {
      if (dbDocument) {
        res.status(403).json({
          status: "not ok",
          message: "Product already exists",
        });
      } else {
        ProductModel.create(document)
          .then(function (dbDocument) {
            res.json({
              document: dbDocument,
              message: "Product created",
            });
          })
          .catch(function (dbError) {
            console.log("DB product create error", dbError);
            res.json({
              message: "Product create error",
            });
          });
      }
    });
  }
);

module.exports = router;
