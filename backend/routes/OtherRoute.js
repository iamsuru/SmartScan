const express = require('express')
const router = express.Router()
const UploadFromMobileController = require('../controllers/UploadFromMobileController')
const UserDataController = require('../controllers/UserDataController')

router.post('/uploadUserData', UserDataController.uploadUserData)
router.post('/sendUploadedURL', UploadFromMobileController.getUploadedURL)
router.get('/getUploadedURL', UploadFromMobileController.sendUploadedURL)


module.exports = router