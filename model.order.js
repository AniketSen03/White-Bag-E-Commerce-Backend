const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signup",
      required: true,
    },

    items: [
      {
        title: String,
        price: Number,
        image: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    shippingDetails: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      upi: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "upi"],
    },

    totalAmount: Number,

    status: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
