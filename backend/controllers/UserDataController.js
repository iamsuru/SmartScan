const UserData = require("../src/models/personDataSchema")
const uploadUserData = async (req, res) => {
    const { full_name, email, DOB, gender, fileName, destinationPath } = req.body
    const uploadData = new UserData({
        full_name,
        email,
        DOB,
        gender,
        fileName,
        destinationPath
    })

    try {
        uploadData.save()
            .then(() => {
                res.status(201).json({
                    message: 'Successfully Uploaded'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    message: `Error Occurred ${err}`
                })
            })
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

module.exports = { uploadUserData }