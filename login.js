const express = require('express');
const collection = require('./model.signup') // You are using signup model
const router = express.Router();

// router.get('/', async (req, res) => {
//     const logininfo = await collection.find();
//     res.json(logininfo);
// });

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await collection.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userExist.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // ✅ SEND PROPER USER OBJECT
    res.json({
      message: "Login Successful",
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
