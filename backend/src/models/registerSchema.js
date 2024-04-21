const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true,
        unique: [true, 'Email is already in use']
    },
    password: {
        type: String,
        required: true
    }
})


const Register = new mongoose.model('Auth', registerSchema)

module.exports = Register