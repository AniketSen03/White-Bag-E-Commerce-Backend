const express = require("express");
const Order = require("./model.order");
const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET USER ORDERS
router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });
  res.json(orders);
});

// ORDER DETAILS
router.get("/detail/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

module.exports = router;
