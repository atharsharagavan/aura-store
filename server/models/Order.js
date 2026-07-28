import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, name: String, price: Number, quantity: { type: Number, min: 1 } }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered'], default: 'Processing' },
  address: { fullName: String, line1: String, city: String, postalCode: String, country: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
