import React, { useEffect, useState } from 'react';
import { FormLabel, Input, Button, RadioGroup, Stack, Radio, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader, useToast } from '@chakra-ui/react';
import { Form } from 'reactstrap';
import QRcontainer from './QRcontainer';
import OptionChooser from './OptionChooser';
import fetchURL from '../scripts/fetchURL';

import { ref, uploadBytes } from 'firebase/storage'
import { fileDatabase } from '../helper/firebaseConfig'
import fileNameGenerator from '../scripts/fileNameGenerator';

const SampleForm = () => {
    const [full_name, setFullName] = useState();
    const [email, setEmail] = useState();
    const [DOB, setDOB] = useState();
    const [gender, setGender] = useState();
    const [fileURL, setFileURL] = useState()
    const [fileName, setFileName] = useState()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        const generatedName = fileNameGenerator(full_name)
        setFileName(generatedName)
        // if (!fileURL) {
        //     toast({
        //         title: 'No file found to upload',
        //         status: 'error',
        //         duration: "2000",
        //         isClosable: false,
        //         position: 'top'
        //     });
        //     return
        // }

        const fileRef = ref(fileDatabase, `UserData/${full_name}/${fileName}`)

        try {
            const file = await fetch(fileURL)

            const fileBlob = await file.blob()

            await uploadBytes(fileRef, fileBlob)
                .then((snapshot) => {
                    toast({
                        title: 'File Uploaded',
                        status: 'success',
                        duration: "2000",
                        isClosable: false,
                        position: 'top'
                    });
                })

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

    }

    const downloadFileFromURL = async () => {
        const response = await fetch('https://www.google.com/url?sa=i&url=https%3A%2F%2Fbuffer.com%2Flibrary%2Ffree-images%2F&psig=AOvVaw1ygQA7vDbOHR6uQeGZGiLr&ust=1713776711302000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCpkvb50oUDFQAAAAAdAAAAABAE');
        const blob = await response.blob();
        return blob;
    }


    //ModalChooser.jsx

    const [showQRCode, setShowQRCode] = useState(false)
    const [uniqueCode, setUniqueCode] = useState('')

    const generateUniqueID = () => {
        let key = ''
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length
        for (var i = 0; i < 6; i++) {
            key += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return key;
    }

    const handleCancel = () => {
        setShowQRCode(false)
        onClose()
    }

    const handleShowQRCode = () => {
        setShowQRCode(true);
        fetchURL((finalURL) => {
            setShowQRCode(false);
            handleCancel();
            setFileURL(finalURL)
        });
    };


    useEffect(() => {
        if (isOpen) {
            const uniqueCode = generateUniqueID()
            setUniqueCode(uniqueCode)
        }
    }, [isOpen])

    return (
        <>
            <div style={{ width: '75%' }}>
                <h3 className='mt-5'>Update KYC</h3>
                <Form onSubmit={handleFormSubmit} className='mt-5'>
                    <div className='mb-2'>
                        <FormLabel fontSize={14}>Full Name</FormLabel>
                        <Input className='input-field' type='name' onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className='mb-2 mt-3'>
                        <FormLabel fontSize={14}>Email Address</FormLabel>
                        <Input className='input-field' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2 mt-3'>
                        <FormLabel fontSize={14}>Date of Birth</FormLabel>
                        <Input className='input-field' type='date' onChange={(e) => setDOB(e.target.value)} />
                    </div>
                    <div className='mb-2 mt-3'>
                        <FormLabel fontSize={14}>Gender</FormLabel>
                        <RadioGroup onChange={setGender}>
                            <Stack spacing={4} direction='row'>
                                <Radio colorScheme='green' value='Male'>Male</Radio>
                                <Radio colorScheme='green' value='Female'>Female</Radio>
                                <Radio colorScheme='green' value='Other'>Other</Radio>
                            </Stack>
                        </RadioGroup>
                    </div>
                    <div className='mb-2 mt-3'>
                        <span className='me-5' style={{ fontWeight: "550" }}>Document</span>
                        <Button colorScheme='linkedin' size='xs' onClick={onOpen}>Upload Document</Button>
                    </div>

                    <div className='mt-4'>
                        <Button size='sm' background='#4990e7' color='white' _hover={{ background: '#0b5ed7' }} width='100%' type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>

            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={handleCancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='text-center'>Choose Option</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        {showQRCode ? (
                            <QRcontainer uniqueCode={uniqueCode} onTimerComplete={handleCancel} />
                        ) : (
                            <OptionChooser handleShowQRCode={handleShowQRCode} />
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SampleForm;
