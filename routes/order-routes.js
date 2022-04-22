const express = require('express');
const router = express.Router();

const OrderModel = require('../models/OrderModel.js');

router.post('/create',                                       
    function(req, res) {

        const document = {
            "email": req.body.email,
            "totalprice": req.body.totalprice,
            "orderitems" : req.body.orderitems
        };

        OrderModel
        .create(document)
        .then(
            function(dbDocument) {
                res.json(
                    {
                        document: dbDocument,
                        message: "Order created"
                    }
                );
            }
        )
        .catch(
            function(dbError) {
                console.log('DB order create error', dbError);
                res.json(
                    {
                        message: "Order create error"
                    }
                );
            }
        );
    }
);

// example of deleting many

// router.post('/delete' , 
// function(req , res){
//     const document = {
//         "email" : req.body.email
//     }

//     OrderModel
//     .deleteMany({email:document.email})
//     .then(
//         function(result){
//             res.json(
//                 {
//                     document: result,
//                     message: "Orders deleted"
//                 }
//             );
//         }
//     )
//     .catch(
//         function(error){
//             console.log("Query error in /order/delete" + error);
//         }
//     )
// }
// )

module.exports = router;