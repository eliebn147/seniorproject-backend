const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },

        totalprice: {
            type: Number,
            required: true
        },

        orderitems : [Object]
        ,
      
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        
    }
);


const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;