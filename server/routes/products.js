import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === 'true') filter.featured = true;
  if (req.query.maxPrice) filter.price = { $lte: Number(req.query.maxPrice) };
  res.json(await Product.find(filter).sort({ createdAt: -1 }));
});
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});
export default router;
