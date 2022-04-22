const express = require('express');
const router = express.Router();

const FeedbackModel = require('../models/FeedbackModel.js');

router.post('/create',                                       
    function(req, res) {

        const document = {
            "email": req.body.email,
            "message" : req.body.message
        };

        FeedbackModel
        .create(document)
        .then(
            function(dbDocument) {
                res.json(
                    {
                        document: dbDocument,
                        message: "Feedback created"
                    }
                );
            }
        )
        .catch(
            function(dbError) {
                console.log('DB feedback create error', dbError);
                res.json(
                    {
                        message: "feedback create error"
                    }
                );
            }
        );
    }
);


module.exports = router;