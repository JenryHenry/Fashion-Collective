const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: `Women's Dresses` },
    { name: `Women's Tops` },
    { name: `Women's Bottoms` },
    { name: `Women's Shoes` },
    { name: `Women's Accessories` },
    { name: `Men's Shirts` },
    { name: `Men's Bottoms` },
    { name: `Men's Shoes` },
    { name: `Men's Accessories` },
  ]);

  console.log('Categories Seeded!');

    const products = await Product.insertMany([
        {
            category: categories[0]._id,
            count: 78,
            description: `Women's orange sun dress.`,
            image: 'orange-dress.jpg',
            price: 29.99,
            title: `Orange Sun Dress`
        },
        {
            category: categories[0]._id,
            count: 78,
            description: `Women's casual pink dress. (Image by mrsiraphol on Freepik)`,
            image: 'freepik-pink-dress.jpg',
            price: 19.99,
            title: 'Pink Dress'
        },
        {
            category: categories[0]._id,
            count: 32,
            description: `Women's fashion jean dress. (Image by mrsiraphol on Freepik)`,
            image: 'freepik-jean-dress.jpg',
            price: 22.99,
            title: 'Jean Dress'
        },
        {
            category: categories[1]._id,
            count: 99,
            description: `Women's pink fleece jacket. (Image by mrsiraphol on Freepik)`,
            image: 'freepik-fleece-jacket.jpg',
            price: 29.99,
            title: 'Pink Fleece Jacket'
        },
        {
            category: categories[1]._id,
            count: 74,
            description: `Women's black and white stripped top. (Photo by Vecteezy.com)`,
            image: `vecteezy_striped-top.jpg`,
            price: 15.99,
            title: 'Striped Top'
        },
        {
            category: categories[2]._id,
            count: 45,
            description: `Women's pink pants.`,
            image: 'womens-pink-pants.jpg',
            price: 19.99,
            title: 'Pink Pants'
        },
        {
            category: categories[2]._id,
            count: 54,
            description: `Women's ripped blue jean shorts.`,
            image: 'womens-blue-jean-shorts.jpg',
            price: 19.99,
            title: 'Ripped Jean Shorts'
        },
        {
            category: categories[3]._id,
            count: 50,
            description: `Beige women's high heels. (Photo by Vecteezy.com)`,
            image: 'vecteezy_beige-heels.jpg',
            price: 34.99,
            title: 'Fashion Heels'
        },
        {
            category: categories[3]._id,
            count: 23,
            description: `Vintage pink women's pumps. (Photo by Vecteezy.com)`,
            image: 'vecteezy-pink-pumps.jpg',
            price: 37.99,
            title: 'Pink Pumps'
        },
        {
            category: categories[4]._id,
            count: 46,
            description: `Chic modern blue purse.`,
            image: `blue-purse.jpg`,
            price: 26.99,
            title: 'Blue Purse'
        },
        {
            category: categories[4]._id,
            count: 39,
            description: `Modern black bucket hat. (Photo by Vecteezy.com)`,
            image: 'vecteezy-bucket-hat.jpg',
            price: 19.99,
            title: 'Black Bucket Hat'
        },
        {
            category: categories[5]._id,
            count: 78,
            description: `Men's plain white t-shirt. (Photo by Vecteezy.com)`,
            image: 'vecteezy-white-tee.jpg',
            price: 10.99,
            title: 'White T-Shirt'
        },
        {
            category: categories[5]._id,
            count: 26,
            description: `Men's blue button up shirt. (Photo by Vecteezy.com)`,
            image: 'vecteezy-mens-button-up.jpg',
            price: 15.99,
            title: `Men's Button Up`
        },
        {
            category: categories[6]._id,
            count: 49,
            description: `Men's blue straight jeans. (Photo by Vecteezy.com)`,
            image: 'vecteezy-blue-jeans.jpg',
            price: 24.99,
            title: 'Blue Jeans'
        },
        {
            category: categories[6]._id,
            count: 82,
            description: `Men's red and white stripped shorts. (Photo by Vecteezy.com)`,
            image: 'vecteezy-striped-shorts.jpg',
            price: 21.99,
            title: 'Stripped Shorts'
        },
        {
            category: categories[7]._id,
            count: 22,
            description: `Men's athletic shoes. (Photo by Vecteezy.com)`,
            image: 'vecteezy-athletic-shoes.jpg',
            price: 35.99,
            title: 'Athletic Shoes'
        }, 
        {
            category: categories[7]._id,
            count: 34,
            description: `Men's gray dress shoes. (Photo by Vecteezy.com)`,
            image: 'vecteezy-dress-shoes.jpg',
            price: 45.99,
            title: 'Dress Shoes'
        },
        {
            category: categories[8]._id,
            count: 35,
            description: `Men's black and brown flat cap. (Image by mrsiraphol on Freepik)`,
            image: 'freepik-mens-hat.jpg', 
            price: 28.99,
            title: 'Cap'
        }, 
        {
            category: categories[8]._id,
            count: 57,
            description: `Men's orange modern wrist watch. (Photo by Vecteezy.com)`,
            image: 'vecteezy-wrist-watch.jpg',
            price: 24.99,
            title: `Orange Wrist Watch`
        }
    ]);

  console.log('Products Seeded!');

  await User.create({
    username: 'jackieA',
    email: 'jackieA@email.com',
    password: 'password12345',
    orders: [
      {
        products: [products[1]._id, products[8]._id],
      },
    ],
    outfits: [
      {
        outfitName: 'outfit1',
        top: products[1]._id,
        shoes: products[8]._id,
      },
      {
        outfitName: 'outfit2',
        top: products[4]._id,
        bottom: products[5]._id,
        shoes: products[7]._id,
      },
      {
        outfitName: 'summer',
        top: products[4]._id,
        bottom: products[5]._id,
        shoes: products[7]._id,
      },
      {
        outfitName: 'winter',
        top: products[1]._id,
        bottom: products[5]._id,
        shoes: products[8]._id,
      },
      {
        outfitName: 'spring',
        top: products[4]._id,
        bottom: products[5]._id,
        shoes: products[7]._id,
      },
    ],
  });

  await User.create({
    username: 'AdamT',
    email: 'AdamT@email.com',
    password: 'onetwothree123',
    orders: [
      {
        products: [products[12]._id, products[16]._id],
      },
    ],
    outfits: [
      {
        outfitName: 'outfit3',
        top: products[12]._id,
        shoes: products[16]._id,
      },
    ],
  });

  console.log('Users Seeded!');

  process.exit();
});
