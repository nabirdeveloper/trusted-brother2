import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  specifications: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);