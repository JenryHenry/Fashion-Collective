const mongoose = require('mongoose');

const { Schema } = mongoose;

const outfitSchema = new Schema({
  top: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  bottom: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  shoes: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }, 
  accesories: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
  ]
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
