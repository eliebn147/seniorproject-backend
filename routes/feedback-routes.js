const express = require("express");
const router = express.Router();

const FeedbackModel = require("../models/FeedbackModel.js");

router.post("/create", function (req, res) {
  const document = {
    email: req.body.email,
    message: req.body.message,
    avatar: req.body.avatar,
  };

  FeedbackModel.create(document)
    .then(function (dbDocument) {
      res.json({
        document: dbDocument,
        message: "Feedback created",
      });
    })
    .catch(function (dbError) {
      console.log("DB feedback create error", dbError);
      res.json({
        message: "feedback create error",
      });
    });
});

router.get("/all", function (req, res) {
  FeedbackModel
  .find()
  .then(function (dbDocument) {
    res.json({
      message: "All the feedback",
      document: dbDocument,
    });
  })
  .catch(function(error){
    res.json({
        message : "Error in feedback/all",
        error : error
    })
})
  
});

module.exports = router;
