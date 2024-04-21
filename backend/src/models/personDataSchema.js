const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    destinationPath: {
        type: String,
        required: true,
    }
})

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;