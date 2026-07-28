import express from 'express';
import Order from '../models/Order.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { items, address } = req.body;
  if (!items?.length || !address?.fullName || !address?.line1) return res.status(400).json({ message: 'Items and delivery address are required' });
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({ user: req.user.id, items, totalPrice, address });
  res.status(201).json(order);
});
router.get('/mine', requireAuth, async (req, res) => res.json(await Order.find({ user: req.user.id }).sort({ createdAt: -1 })));
export default router;
