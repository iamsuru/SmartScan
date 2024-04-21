const { generateToken } = require('../src/helper/generateToken')
const Auth = require('../src/models/registerSchema')
const bcrypt = require('bcrypt')
const fs = require('fs').promises
const path = require('path')
const jwt = require('jsonwebtoken')
let token;
const Register = async (req, res) => {
    const { name, email_id, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'Error occurred while hashing the password'
            })
        } else {
            const new_user = new Auth({
                name,
                email_id,
                password: hash,
            })
            new_user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'Successfully Registered'
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        message: `Error Occurred ${err}`
                    })
                })
        }
    })
}

const Login = async (req, res) => {
    const { email_id, password: userPassword } = req.body;
    try {
        let auth = await Auth.findOne({ email_id });
        if (!auth) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(userPassword, auth.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const { password: _, ...authWithoutPassword } = auth.toObject();
        // await fs.mkdir(path.join(__dirname, '..', '..', 'frontend', 'src', 'Uploads', `${auth._id}`))
        token = generateToken(auth._id)
        res.status(200).json({
            message: 'Authentication successful', auth: authWithoutPassword, token: token
        });
    } catch (err) {
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
};

const isTokenExpired = async (req, res) => {
    const { token } = req.body

    try {
        const decodedToken = jwt.decode(token, { complete: true });

        if (decodedToken.payload.exp) {
            const expirationTime = decodedToken.payload.exp

            const currentTime = Math.floor(Date.now() / 1000);

            if (expirationTime < currentTime) {
                return res.status(410).json({ message: 'Expired' })
            } else {
                return res.status(200).json({ message: 'Not expired' })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



module.exports = { Register, Login, isTokenExpired }