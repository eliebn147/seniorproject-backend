const express = require('express');
const router = express.Router();

const ProductModel = require('../models/ProductModel.js');

router.post('/create',                      // http://www.benjamin.com/products/                   
    function(req, res) {

        const document = {
            "name": req.body.name,
            "description": req.body.description,
            "price": req.body.price,
            "category": req.body.category,
        };

        ProductModel
        .create(document)
        .then(
            function(dbDocument) {
                res.json(
                    {
                        document: dbDocument,
                        message: "Product created"
                    }
                );
            }
        )
        .catch(
            function(dbError) {
                console.log('DB product create error', dbError);
                res.json(
                    {
                        message: "Product create error"
                    }
                );
            }
        );
    }
);

module.exports = router;