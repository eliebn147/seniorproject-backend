const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        items: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        count:{
            type:Number,
            default:0,
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        },
        url : {
            type : String,
            required: false,
            default :"https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        }
    }
);


const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;