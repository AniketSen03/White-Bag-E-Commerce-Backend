const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const signupRouter = require('./signup')
const loginRouter = require('./login')
const cartRouter = require('./cart')
const orderRouter = require("./order");
const connectDB = require('../Backend/config/db')

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.use('/signup', signupRouter)
app.use("/orders", orderRouter);
app.use('/login', loginRouter)
app.use('/add_to_cart', cartRouter)
app.use("/contact", require("./contact"));

mongoose.connect('mongodb://127.0.0.1:27017/whitebagshoppingwebsite')
    .then(() => { console.log('MongoDB connected'); })
    .catch((err) => { console.log('MongoDB connection error:', err); });

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/", (req, res) => {
    res.send("Backend working");
});

export default async function handler(req, res) {
    await connectDB();
    app(req, res);
}