const express = require('express');
const router = express.Router();

const DollarModel = require('../models/DollarModel.js');

router.post('/create',                                       
    function(req, res) {

        const document = {
            "dollarRate": req.body.dollarRate,
            
        };

        DollarModel
        .create(document)
        .then(
            function(dbDocument) {
                res.json(
                    {
                        document: dbDocument,
                        message: "DollarRate created"
                    }
                );
            }
        )
        .catch(
            function(dbError) {
                console.log('DB dollar create error', dbError);
                res.json(
                    {
                        message: "dollar create error"
                    }
                );
            }
        );
    }
);

router.put('/update',
    function(req, res) {

        // The search criteria
        const search = {dollarRate:  { $gte: 0}}

        // The replacement of the document
        const updatedDocument = {
           dollarRate : req.body.dollarRate
        }

        // This will tell MongoDB to show the updated document
        const options = {new: true}

        DollarModel
        .findOneAndUpdate(
            search,
            updatedDocument,
            options
        )
        .then(
            function(updatedDocument) {
                
                res.json(
                    {
                        document: updatedDocument,
                        message: "Dollar rate updated"
                    }
                );
            }
        )
        .catch(
            function(error) {
                res.json(
                    {
                        error: error,
                        message: "error in /dollar/update found"
                    }
                );
            }
        )
    }
);

router.get('/one' , 
  function(req , res) {
      DollarModel
      .findOne({dollarRate: {$gte : 0}})
      .then(
          function(dbDocument){
            res.json({
                message : "Dollar Rate",
                document : dbDocument
            })
          }
      )
      .catch(
          function(error){
              res.json({
                  message : "Error in dollar/one",
                  error : error
              })
          }
      )
  }
)



module.exports = router;