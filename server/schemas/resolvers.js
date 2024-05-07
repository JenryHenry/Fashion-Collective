const { User, Outfit, Product } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      const user = User.findById(context.user._id);
      return user;
    },
    outfits: async (parent, args, context) => {
      const user = User.findById(context.user._id);
      return user.outfits;
    },
    getSingleOutfit: async (parent, args, context) => {
      const user = User.findOne({ _id: context.user._id});
      return user.outfits.find((outfit) => {return outfit.outfitName === args.outfitName})      
    },
    getProducts: async (parent, args, context) => {
      return await Product.find();
    },
    getTypeProducts: async (parent, args, context) => {
      return await Product.find({ category: args.category});
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
