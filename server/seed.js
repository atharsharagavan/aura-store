import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import { CATALOG, productId } from '../client/src/catalog.js';

await mongoose.connect(process.env.MONGODB_URI);
await Product.bulkWrite(CATALOG.map((item) => ({
  updateOne: {
    filter: { _id: new mongoose.Types.ObjectId(productId(item)) },
    update: { $set: {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
      audience: item.audience,
      stock: item.stock,
      featured: Boolean(item.badge)
    } },
    upsert: true
  }
})));
console.log(`${CATALOG.length} Aura Store products seeded or refreshed`);
await mongoose.disconnect();
