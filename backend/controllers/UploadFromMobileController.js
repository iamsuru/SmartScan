let uploadedURL = '';

const getUploadedURL = (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        uploadedURL = req.body.uploadedURL
        console.log(uploadedURL);
        res.status(200).json({ message: 'Location received successfully' });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const sendUploadedURL = (req, res) => {
    if (uploadedURL.length > 0) {
        const urlToSend = uploadedURL;
        uploadedURL = '';
        return res.status(200).json({ uploadedURL: urlToSend })
    }
    else {
        return res.status(404).json({ message: 'URL not found' });
    }
}

module.exports = { getUploadedURL, sendUploadedURL };
