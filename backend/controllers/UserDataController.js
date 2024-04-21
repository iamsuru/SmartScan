const UserData = require("../src/models/personDataSchema")
const path = require('path')
const uploadUserData = async (req, res) => {
    // const { full_name, email, DOB, gender, fileName } = req.body
    // const uploadData = new UserData({
    //     full_name,
    //     email,
    //     DOB,
    //     gender,
    //     fileName,
    //     destinationPath: ''
    // })

    // uploadData.save()
    //     .then(() => {
    //         res.status(201).json({
    //             message: 'Successfully Uploaded'
    //         })
    //     })
    //     .catch((err) => {
    //         res.status(400).json({
    //             message: `Error Occurred ${err}`
    //         })
    //     })
    // res.end(path.join(__dirname, '..', '..', 'frontend', 'src',''))
}

module.exports = { uploadUserData }