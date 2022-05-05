const mongoose = require('mongoose');

const DollarSchema = new mongoose.Schema(
    {
        dollarRate: {
            type: Number,
            required: true
        }

    }
);


const DollarModel = mongoose.model('dollar', DollarSchema);

module.exports = DollarModel;