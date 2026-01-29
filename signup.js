const express = require('express');
const collection = require('./model.signup')
const router = express.Router();

// router.get('/', async (req, res) => {
//     const signupinfo = await collection.find();
//     res.json(signupinfo);
// });

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExist = await collection.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // If not exists, create new user
        const user = new collection({ name, email, password });
        await user.save();

        res.json({
            message: 'Signup successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

module.exports = router;
