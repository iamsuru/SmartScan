import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Button, FormLabel, useToast } from '@chakra-ui/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fileDatabase } from '../helper/firebaseConfig'


function OptionChooser({ uniqueCode, handleShowQRCode, setLoading2 }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState()
    const [location, setLocation] = useState();
    const toast = useToast();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userId = currentUser._id;
        setUserId(userId)

        const tmp = uniqueCode
        setLocation(tmp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setLoading2(true)
    };

    useEffect(() => {
        if (selectedFile) {
            preSendingFormality()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

    const preSendingFormality = () => {
        if (selectedFile) {
            uploadToServer(selectedFile)
        } else {
            console.log('chl be');
        }
    }

    const uploadToServer = async (selectedFile) => {

        if (selectedFile && userId && location) {
            const fileRef = ref(fileDatabase, `uploads/${userId}/${location}`);
            try {
                await uploadBytes(fileRef, selectedFile)
                    .then(async (snapshot) => {
                        const downloadURL = await getDownloadURL(fileRef);
                        sendUploadedURL(downloadURL)
                    })

            } catch (error) {
                toast({
                    title: 'Error uploading file',
                    description: 'Refresh and try again',
                    status: 'error',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                });
            }
        } else {
            toast({
                title: 'Please select a file',
                description: 'Refresh and try again',
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            });
        }
    };


    const sendUploadedURL = async (uploadedURL) => {
        try {
            const response = await fetch('/api/sendUploadedURL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uploadedURL })
            })
            if (response.status === 200) {

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
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <span className='ms-5 me-5' style={{ fontWeight: "550" }}>Locally</span>
                <Input size='sm' type='file' className='me-5' onChange={handleFileInput} />
            </div>
            <FormLabel textAlign='center' className='mt-3 mb-3'>OR</FormLabel>
            <div className='d-flex justify-content-center align-items-center'>
                <span className='me-5' style={{ fontWeight: "550" }}>Using SmartScan</span>
                <Button size='sm' color='white' backgroundColor='#68b4db' _hover={{ backgroundColor: "#68b4db" }} onClick={handleShowQRCode}>Show QR Code</Button>
            </div>
        </>
    );
}

OptionChooser.propTypes = {
    handleShowQRCode: PropTypes.func.isRequired,
};

export default OptionChooser;