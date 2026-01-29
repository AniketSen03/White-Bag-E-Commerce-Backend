const express = require('express');
const router = express.Router();
const CartItem = require('./model.cart');

// Add item
router.post('/', async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved); // return saved item with _id
  } catch (err) {
    res.status(500).json({ error: 'Add failed' });
  }
});

// Get items
router.get('/', async (req, res) => {
  const items = await CartItem.find();
  res.status(200).json(items);
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
