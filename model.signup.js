const mongoose = require('mongoose')
const collection = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    }
)

module.exports = mongoose.model('signup', collection, 'signup') //3rd parameter means to store data in 'signup' if i not give this 3rd parameter then it will store in 'signups' by default
