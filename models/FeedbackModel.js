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
            type: String,
            required : false,
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },

    }
);


const FeedbackModel = mongoose.model('feedback', FeedbackSchema);

module.exports = FeedbackModel;