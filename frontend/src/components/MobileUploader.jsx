import { Button, FormLabel, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Form, Input } from 'reactstrap'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fileDatabase } from '../helper/firebaseConfig'

const MobileUploader = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [id, setUserId] = useState(null);
    const [location, setLocation] = useState(null);
    const [uploadedURL, setUploadedURL] = useState()
    const toast = useToast();


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
        if (selectedFile && id && location) {
            const fileRef = ref(fileDatabase, `uploads/${id}/${location}`);
            try {
                await uploadBytes(fileRef, selectedFile);
                // Get download URL after successful upload
                const downloadURL = await getDownloadURL(fileRef);
                setUploadedURL(downloadURL)
                toast({
                    title: 'File Uploaded',
                    status: 'success',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                });
            } catch (error) {
                toast({
                    title: 'Error uploading file',
                    description: error.message,
                    status: 'error',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                });
            }
        } else {
            toast({
                title: 'Please select a file',
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            });
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
            const response = await fetch('/api/sendUploadedURL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uploadedURL })
            })
            const data = await response.json()
            if (response.status === 200) {
                toast({
                    title: data.message,
                    status: 'success',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                })
            } else if (response.status === 500) {
                toast({
                    title: 'Please try again',
                    status: 'error',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                })
            }
        } catch (error) {
            toast({
                title: error,
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            })
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <Form onSubmit={uploadToServer}>
                <FormLabel className='text-center mb-4'>Upload Document</FormLabel>
                <Input type='file' size='sm' onChange={handleFileInput} />
                <Button size='sm' className='mt-4' width='100%' colorScheme='blue' type='submit'>Upload</Button>
            </Form>
        </div>
    )
}

export default MobileUploader;
