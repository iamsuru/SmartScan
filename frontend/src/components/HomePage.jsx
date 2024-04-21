import React, { useEffect } from 'react'
import SampleForm from './SampleForm'
import { useNavigate } from 'react-router-dom';

const Preview = () => {
    return (
        <div style={{ height: '550px', width: '600px' }} className='mt-5'>
            {/* https://firebasestorage.googleapis.com/v0/b/smartscan-41152.appspot.com/o/uploads%2F66216d147ad86fca7cee16e0%2FugayLj?alt=media&token=e2a4065d-880e-4ed9-8c5c-2b2678c4a431 */}
            <iframe
                id='previewDocument'
                src=""
                title="Document Preview"
                height='100%'
                width='100%'
            ></iframe>
        </div>
    )
}

const HomePage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('currentUserToken'))
        if (!token) {
            navigate('/')
        }
    }, [navigate])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
                        <SampleForm />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='d-flex justify-content-center'>
                        <Preview />
                    </div>
                </div>
            </div>
        </div>
    )
}



export { HomePage };


// class FetchURL {
//     async fetchURL(callback) {
//         let seconds = 59;
//         var intervalId = setInterval(async () => {
//             if (seconds === 0) {
//                 clearInterval(intervalId);
//             }
//             else {
//                 seconds--;
//                 try {
//                     const response = await fetch('/api/getUploadedURL', {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     })

//                     const data = await response.json()

//                     if (response.status === 200) {
//                         clearInterval(intervalId);
//                         if (callback) {
//                             callback();
//                         }
//                         document.getElementById('previewDocument').src = data.uploadedURL;
//                     }
//                     else {
//                         console.error('Error checking file existence. Status:', response.status);
//                     }
//                 } catch (error) {
//                     console.error('Error checking file existence:', error);
//                 }
//             }
//         }, 1000);
//     }
// }