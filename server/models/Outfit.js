const mongoose = require('mongoose');

const { Schema } = mongoose;

const outfitSchema = new Schema({
  outfitName: {
    type: String,
    required: 'Your outfit needs a name!',
    minlength: 1,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  top: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  bottom: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  shoes: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  accessories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

module.exports = outfitSchema;
