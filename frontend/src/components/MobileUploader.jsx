import { Button, FormLabel, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Form, Input } from 'reactstrap'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fileDatabase } from '../helper/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
const MobileUploader = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [id, setUserId] = useState(null);
    const [location, setLocation] = useState(null);
    const [uploadedURL, setUploadedURL] = useState()
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fileLocation = urlParams.get('location');
        const userId = urlParams.get('ID');
        if (fileLocation && userId) {
            setUserId(userId);
            setLocation(fileLocation);
        }
    }, []);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadToServer = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (selectedFile && id && location) {
            const fileRef = ref(fileDatabase, `uploads/${id}/${location}`);
            try {
                await uploadBytes(fileRef, selectedFile);
                // Get download URL after successful upload
                const downloadURL = await getDownloadURL(fileRef);
                setUploadedURL(downloadURL)
            } catch (error) {
                toast({
                    title: 'Error uploading file',
                    description: error.message,
                    status: 'error',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                });
                setLoading(false)
            }
        } else {
            toast({
                title: 'Please select a file',
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            });
            setLoading(false)
        }
    };

    let seconds = 89;
    var intervalId = setInterval(() => {
        if (seconds === 0) {
            clearInterval(intervalId);
        }
        else {
            seconds--;
            try {
                if (uploadedURL) {
                    sendUploadedURL(uploadedURL)
                    clearInterval(intervalId)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, 1000);


    const sendUploadedURL = async (uploadedURL) => {
        try {
            const response = await fetch('https://smartscan-server.onrender.com/api/sendUploadedURL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uploadedURL })
            })
            if (response.status === 200) {
                toast({
                    title: 'File Uploaded Succesfully',
                    status: 'success',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                })
                setTimeout(() => {
                    navigate('/uploadedSuccessfully/showTrue')
                }, 2500)
            } else if (response.status === 500) {
                toast({
                    title: 'Please try again',
                    status: 'error',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                })
            }
            setLoading(false)
        } catch (error) {
            toast({
                title: error,
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            })
            setLoading(false)
        }
    }

    const content = {
        width: '300px',
        height: '200px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#68b5db67',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "95vh" }}>
            <Form style={content} className='p-4' onSubmit={uploadToServer}>
                <FormLabel className='text-center mb-4'>Upload Document</FormLabel>
                <Input type='file' size='sm' onChange={handleFileInput} />
                <Button isLoading={loading} spinner={<BeatLoader size={7} color='white' />} size='sm' className='mt-4' width='100%' colorScheme='blue' type='submit'>Upload</Button>
            </Form>
        </div>
    )
}

export default MobileUploader;
