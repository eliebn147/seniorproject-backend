const express = require("express");
const router = express.Router();

const cloudinary = require('cloudinary').v2;

const ProductModel = require("../models/ProductModel.js");

router.post(
  "/create", 
    async function (req, res) {
    const document = {
      name: req.body.name.toLowerCase(),
      items: req.body.items,
      price: req.body.price,
      type: req.body.type,
    };

    ProductModel.findOne({ name: document.name }).then( async function (dbDocument) {
      if (dbDocument) {
        res.status(403).json({
          status: "not ok",
          message: "Product already exists",
        });
      } else {
           /* UPLOAD FILE TO CLOUDINARY */
                    // Check if file has been attached
                    const files = Object.values(req.files);
                    if(files.length > 0) {
                        // Upload the file to Cloudinary
                        await cloudinary.uploader.upload(
                            files[0].path,
                            function(cloudinaryErr, cloudinaryResult) {

                                // If upload is succesful
                                if(!cloudinaryErr) {
                                    // Add image url to 'document'
                                    document['url'] = cloudinaryResult.url;
                                }
                                // else
                                else {
                                    // Send client error
                                    res.json(
                                        {
                                            message: "Avatar upload error in /user/register"
                                        }
                                    )
                                }
                            }
                        )
                    };
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

router.get('/all' , 
  function(req , res) {
      ProductModel
      .find()
      .then(
          function(dbDocument){
            res.json({
                message : "All the products",
                document : dbDocument
            })
          }
      )
      .catch(
          function(error){
              res.json({
                  message : "Error in product/all",
                  error : error
              })
          }
      )
  }
)

router.post('/delete' , 
function(req , res){
    const document = {
        "name" : req.body.name
    }

    ProductModel
    .findOneAndDelete({name:document.name})
    .then(
        function(result){
            res.json(
                {
                    document: result,
                    message: "Product deleted"
                }
            );
        }
    )
    .catch(
        function(error){
            console.log("Query error in /order/delete" + error);
            res.json(
              {
                  document: result,
                  message: "Error deleting the product"
              }
          );
        }
    )
}
)

router.post('/one' , 
function(req , res){
    const document = {
        "name" : req.body.name
    }

    ProductModel
    .findOne({name:document.name.toLowerCase()})
    .then(

      
        function(result){
          if(result !== null){
            res.json(
                {
                    document: result,
                    message: "Product found"
                }
            );
        }
        else{
          res.json(
            {
                message: "Product is not found"
            }
        );
        }
}
    )
    .catch(
        function(error){
            console.log("Query error in /order/one" + error);
            res.json(
              {
                  document: result,
                  message: "Error finding the product"
              }
          );
        }
    )
}
)

router.put('/update',
    function(req, res) {

        // The search criteria
        const search = {name: req.body.name}

        // The replacement of the document
        const updatedDocument = {
            
            // lastName: req.body.lastName,
            // email: req.body.email,
            // password: req.body.password,
            // phone: req.body.phone
        }

        // This will tell MongoDB to show the updated document
        const options = {new: true}

        ProductModel
        .findOneAndUpdate(
            search,
            {$inc : {'count' : req.body.count}},
            options
        )
        .then(
            function(updatedDocument) {
                
                res.send(updatedDocument);
            }
        )
        .catch(
            function(error) {
                console.log('Error /user/update', error);
            }
        )
    }
);

module.exports = router;
