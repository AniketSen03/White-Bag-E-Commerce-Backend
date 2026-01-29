const mongoose = require('mongoose')
const CartItem = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  quantity: { type: Number, default: 1 }, // default quantity
});

module.exports = mongoose.model('cart', CartItem, 'cart') //3rd parameter means to store data in 'cart' if i not give this 3rd parameter then it will store in 'carts' by default
