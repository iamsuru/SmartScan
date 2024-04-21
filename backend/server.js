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

//Deployment Code

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname1, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.end('API running succesfully.')
    })
}

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
})

// "build": "npm install --legacy-peer-deps && npm install --legacy-peer-deps --prefix frontend && npm run build --prefix frontend"