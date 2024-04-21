// fetchURL.jsx
const fetchURL = async (callback) => {
    let finalURL;
    let seconds = 89;
    var intervalId = setInterval(async () => {
        if (seconds === 0) {
            clearInterval(intervalId);
        } else {
            seconds--;
            try {
                const response = await fetch('/api/getUploadedURL', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.status === 200) {
                    clearInterval(intervalId);
                    finalURL = data.uploadedURL;
                    // Reset the uploadedURL value to avoid reusing the same URL
                    data.uploadedURL = '';
                    document.getElementById('previewDocument').src = finalURL;

                    // Call the callback function with the finalURL as an argument
                    if (callback) {
                        callback(finalURL);
                    }
                } else {
                    console.error('Error checking file existence. Status:', response.status);
                }
            } catch (error) {
                console.error('Error checking file existence:', error);
            }
        }
    }, 1000);
};

export default fetchURL;
