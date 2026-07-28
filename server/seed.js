import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const products = [
  ['Cloud Knit Sweater', 49, 'Clothing', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80'],
  ['Everyday Tote', 68, 'Accessories', 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=80'],
  ['Studio Headphones', 129, 'Tech', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'],
  ['Linen Shirt', 54, 'Clothing', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80'],
  ['Ceramic Mug', 24, 'Home', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80'],
  ['Minimal Watch', 110, 'Accessories', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80'],
  ['Desk Lamp', 75, 'Home', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80'],
  ['Canvas Sneakers', 85, 'Clothing', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80']
].map(([name, price, category, image], index) => ({ name, price, category, image, stock: 15 + index, featured: index < 4, description: `A considered ${name.toLowerCase()} made for everyday use.` }));

await mongoose.connect(process.env.MONGODB_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`${products.length} products seeded`);
await mongoose.disconnect();
