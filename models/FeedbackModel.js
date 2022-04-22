const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        message : {
            type: String,
            required: true,
        },
        avatar : {
            required : false,
        }

    }
);


const FeedbackModel = mongoose.model('feedback', FeedbackSchema);

module.exports = FeedbackModel;