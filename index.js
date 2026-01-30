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
  origin: "https://white-bag.vercel.app",
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

// 🔥 IMPORTANT — MongoDB (serverless safe)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// 🔥 VERCEL HANDLER (THIS IS THE KEY)
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
