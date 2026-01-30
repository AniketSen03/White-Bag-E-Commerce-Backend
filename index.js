const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const signupRouter = require("./signup");
const loginRouter = require("./login");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const contactRouter = require("./contact");

const app = express();

app.use(cors({
  origin: [
    "https://white-bag.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/add_to_cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("Backend working");
});

// ✅ MongoDB Atlas connection
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Mongo error:", err);
  }
}

// ✅ Vercel handler
module.exports = async (req, res) => {
  await connectDB();
  app(req, res);
};
