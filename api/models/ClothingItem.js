const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  description: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // опция за любими
}, { timestamps: true });

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
