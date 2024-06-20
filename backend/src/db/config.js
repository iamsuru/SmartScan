const mongoose = require('mongoose')
require('dotenv').config()
const DB_URL = process.env.MONGO_URL
mongoose.connect(DB_URL)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch((err) => {
        console.log(`Database connection failed\n${err}`)
    }) 