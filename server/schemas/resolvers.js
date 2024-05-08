const { Category, User, Outfit, Product } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = User.findById(context.user._id);
      return user;
    },
    categories: async () => {
      return await Category.find();
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
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
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
      const user = User.findById(context.user._id);
      return user.outfits;
    },
    getSingleOutfit: async (parent, args, context) => {
      const user = User.findOne({ _id: context.user._id});
      return user.outfits.find((outfit) => {return outfit.outfitName === args.outfitName})      
    },
    getProducts: async () => {
      return await Product.find().populate('category');
    },
    getTypeProducts: async (parent, { category }, context) => {
      const categoryId = await Category.findOne({ name: category }, '_id');
      return await Product.find({ category: categoryId }).populate('category');
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
      if (context) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { outfits: args } },
          { new: true, runValidators: true }
        );
      }
    },
    deleteOutfit: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { outfits: { outfitName: args.outfitName } } },
          { new: true }
        );
      }
    },

    // addTop: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id);
    //     const outfit = user.outfits.find((fit) => {return fit.outfitName === args.outfitName});

    //     console.log(outfit);
    //   }
    // },

    // deleteTop: async (parent, args, context) => {
    //   if (context.user) {
    //     return await Outfit.findOneAndUpdate(
    //       { outfitName: args.outfitName },
    //       { $pull: { top: args.top } },
    //       { new: true }
    //     );
    //   }
    // },

    // addShoes: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { _id: context.user._id, outfitName: args.outfitName },
    //       { $set: { shoes: args.shoes } }
    //     );
    //   }
    // },

    // deleteShoes: async (parent, args, context) => {
    //   if (context.user) {
    //     return await Outfit.findOneAndRemove(
    //       { outfitName: args.outfitName },
    //       { $pull: { shoes: args.shoes } },
    //       { new: true }
    //     );
    //   }
    // },

    // addBottom: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { _id: context.user._id, outfitName: args.outfitName },
    //       { $set: { bottom: args.bottom } }
    //     );
    //   }
    // },

    // deleteBottom: async (parent, args, context) => {
    //   if (context.user) {
    //     return await Outfit.findOneAndRemove(
    //       { outfitName: args.outfitName },
    //       { $pull: { bottom: args.bottom } },
    //       { new: true }
    //     );
    //   }
    // },

    // addAccessories: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findOneAndUpdate(
    //       { _id: context.user._id, outfitName: args.outfitName },
    //       { $set: { accessories: args.accessories } }
    //     );
    //   }
    // },

    // deleteAccessories: async (parent, args, context) => {
    //   if (context.user) {
    //     return await Outfit.findOneAndRemove(
    //       { outfitName: args.outfitName },
    //       { $pull: { accessories: args.accessories } },
    //       { new: true }
    //     );
    //   }
    // },
  },
};
module.exports = resolvers;
