import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, index: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
