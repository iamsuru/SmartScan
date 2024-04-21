const fetchURL = async (callback) => {
    let finalURL;
    let seconds = 89;
    let intervalId = setInterval(async () => {
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
                    data.uploadedURL = '';
                    const previewDiv = document.getElementById('previewDiv')
                    previewDiv.style.height = '550px'
                    previewDiv.style.width = '600px'
                    document.getElementById('previewDocument').src = finalURL;
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
    return intervalId
};

export { fetchURL };
