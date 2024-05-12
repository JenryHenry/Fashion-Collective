const { Category, User, Outfit, Product, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = User.findById(context.user._id);
      return user;
    },
    categories: async () => {
      const categories = await Category.find();
      return categories;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const product of args.products) {
        // Create a line item for each product
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description,
              images: [`${url}/images/${product.image}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQty,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    outfits: async (parent, args, context) => {
      if (context.user) {
      const user = await User.findById(context.user._id).populate({
        path: 'outfits',
        populate: [
          {
            path: 'top',
          },
          {
            path: 'shoes',
          },
          {
            path: 'bottom',
          },
          {
            path: 'accessories',
          }
        ]
      });
      return user.outfits;
      }
    },
    getSingleOutfit: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id});
      return user.outfits.find((outfit) => {return outfit.outfitName === args.outfitName})      
    },
    getProducts: async (parent, { title }, context) => {
      // The getProducts query is case insensitive
      const products = await Product.find({ title: { '$regex': title, $options: 'i' } }).populate('category');
      return products;
    },
    getFeatured: async () => {
      const featuredProducts = await Product.find({ featured: 'true' }).populate('category');
      return featuredProducts;
    },
    getTypeProducts: async (parent, { _id }, context) => {
      const categoryProducts = await Product.find({ category: _id }).populate('category');
      return categoryProducts;
    },
    getAllProducts: async () => {
      const products = await Product.find();
      return products;
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addOutfit: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { outfits: {outfitName: args.outfitName} } },
          { new: true, runValidators: true }
        );
        return updatedUser.outfits;
      }
    },
    deleteOutfit: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { outfits: { outfitName: args.outfitName } } },
          { new: true }
        );
        return updatedUser.outfits;
      }
    },

    addTop: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].top = args.top;
        await user.save();
        return user.outfits;
      }
    },

    deleteTop: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].top = null;
        user.save();
        console.log('delete top user outfits: ', user.outfits);
        return user.outfits;
      }
    },

    addShoes: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].shoes = args.shoes;
        user.save();
        return user.outfits;
      }
    },

    deleteShoes: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );;
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].shoes = null;
        user.save();
        return user.outfits;
      }
    },

    addBottom: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].bottom = args.bottom;
        user.save();
        return user.outfits;
      }
    },

    deleteBottom: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );;
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].bottom = null;
        user.save();
        return user.outfits;
      }
    },

    addAccessories: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const outfitIndex = user.outfits.indexOf(outfit);
        user.outfits[outfitIndex].accessories.push(args.accessories);
        user.save();
        return user.outfits;
      }
    },

    deleteAccessories: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'outfits',
          populate: [
            {
              path: 'top',
            },
            {
              path: 'shoes',
            },
            {
              path: 'bottom',
            },
            {
              path: 'accessories',
            }
          ]
        }
        );
        const outfit = user.outfits.find(outfit => outfit.outfitName === args.outfitName);
        const accessory = user.outfits.accessories.find(accessory => accessory === args.accessories);
        const outfitIndex = user.outfits.indexOf(outfit);
        const accessoryIndex = user.outfits.accessories.indexOf(accessory);
        user.outfits[outfitIndex].accessories[accessoryIndex] = null;
        user.save();
        return user.outfits;
      }
    },
  },
};
module.exports = resolvers;
