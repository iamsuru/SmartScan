const express = require('express')
const app = express();
const AuthRouter = require('./routes/Route')
const OtherRouter = require('./routes/OtherRoute')
const path = require('path')

require('./src/db/firebaseConfig')

require('./src/db/config')

require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', AuthRouter)
app.use('/api', OtherRouter)

app.listen(2000, () => {
    console.log('Server running on PORT 2000');
})