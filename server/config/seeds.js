const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('Category', 'categories');
    await cleanDB('Product', 'products');
    await cleanDB('User', 'users');

    const categories = await Category.insertMany([
        {name: `Women's Dresses`},
        {name: `Women's Tops`},
        {name: `Women's Bottoms`},
        {name: `Women's Shoes`},
        {name: `Women's Accessories`},
        {name: `Men's Shirts`},
        {name: `Men's Bottoms`},
        {name: `Men's Shoes`},
        {name: `Men's Accessories`}
    ]);

    const products = await Product.insertMany([
        {
            category: categories[0]._id,
            count: 58,
            description: ,
            image: '',
            price: 24.99,
            title: ``
        },
        {
            category: categories[0]._id,
            count: 56,
            description: ,
            image: ,
            price: ,
            title: 
        },
        {
            category: categories[0]._id,
            count: 157,
            description: ,
            image: ,
            price: ,
            title: 
        },
        {
            category: categories[0]._id,
            count: 89,
            description: ,
            image: ,
            price: ,
            title: 
        },
        {
            category: categories[0]._id,
            count: 45,
            description: ,
            image: ,
            price: ,
            title: 
        },
        {
            category: categories[0]._id,
            count: 229,
            description: ,
            image: ,
            price: ,
            title: 
        },
    ]);
});