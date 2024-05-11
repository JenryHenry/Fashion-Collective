const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({ 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

const Product = model('Product', productSchema);

module.exports = Product;