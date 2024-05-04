import React, { useEffect, useState } from 'react';
import { FormLabel, Input, Button, RadioGroup, Stack, Radio, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader, useToast, FormControl } from '@chakra-ui/react';
import { Form } from 'reactstrap';
import QRcontainer from './QRcontainer';
import OptionChooser from './OptionChooser';
import { fetchURL } from '../scripts/fetchURL';
import { BeatLoader } from 'react-spinners'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { fileDatabase } from '../helper/firebaseConfig'
import fileNameGenerator from '../scripts/fileNameGenerator';
import { useNavigate } from 'react-router-dom';

const SampleForm = () => {
    const [full_name, setFullName] = useState();
    const [email, setEmail] = useState();
    const [DOB, setDOB] = useState();
    const [gender, setGender] = useState();
    const [fileURL, setFileURL] = useState()

    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate()


    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const fileName = fileNameGenerator(full_name)

        if (!fileURL) {
            toast({
                title: 'No file found to upload',
                status: 'error',
                duration: "2000",
                isClosable: false,
                position: 'top'
            });
            return
        }

        const fileRef = ref(fileDatabase, `UserData/${full_name}/${fileName}`)

        try {
            const file = await fetch(fileURL)
            const fileBlob = await file.blob()

            await uploadBytes(fileRef, fileBlob)
                .then(async (snapshot) => {
                    const destinationPath = await getDownloadURL(fileRef)
                    try {
                        const response = await fetch('/api/uploadUserData', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                full_name,
                                email,
                                DOB,
                                gender,
                                fileName,
                                destinationPath
                            })
                        })

                        const data = await response.json()

                        if (response.status === 201) {
                            toast({
                                title: data.message,
                                status: 'success',
                                duration: "2000",
                                isClosable: false,
                                position: 'top'
                            })
                            setTimeout(() => {
                                navigate('/uploadedSuccessfully/show')
                            }, 2000)
                        }
                        else if (response.status === 400) {
                            toast({
                                title: data.message,
                                status: 'error',
                                duration: "2000",
                                isClosable: false,
                                position: 'top'
                            })
                        }
                        else if (response.status === 500) {
                            toast({
                                title: data.message,
                                status: 'error',
                                duration: "2000",
                                isClosable: false,
                                position: 'top'
                            })
                        }
                        else {
                            toast({
                                title: data.message,
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
                            status: 'danger',
                            duration: "2000",
                            isClosable: false,
                            position: 'top'
                        })
                        setLoading(false)
                    }
                })

                .catch((error) => {
                    toast({
                        title: 'Error Uploading File',
                        description: error.message, // Display the error message
                        status: 'error',
                        duration: "2000",
                        isClosable: false,
                        position: 'top'
                    });
                    setLoading(false)
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
            setLoading(false)
        }

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
        })
    };


    useEffect(() => {
        let currentIntervalId;

        if (isOpen) {
            const uniqueCode = generateUniqueID()
            setUniqueCode(uniqueCode)
        }

        if (isOpen && !showQRCode) {
            fetchURL((finalURL) => {
                setFileURL(finalURL);
                onClose();
                setLoading2(false)
            })
                .then((id) => {
                    currentIntervalId = id;
                })
                .catch((error) => {
                    console.error('Error fetching URL:', error);
                });
        }
        return () => {
            if (currentIntervalId) {
                clearInterval(currentIntervalId);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, showQRCode]);



    return (
        <>
            <div style={{ width: '75%' }}>
                <h3 className='mt-3'>Update KYC</h3>
                <Form onSubmit={handleFormSubmit} className='mt-5'>
                    <FormControl isRequired className='mb-2'>
                        <FormLabel fontSize={14}>Full Name</FormLabel>
                        <Input autoComplete='off' className='input-field' type='name' required onChange={(e) => setFullName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired className='mb-2 mt-3'>
                        <FormLabel fontSize={14}>Email Address</FormLabel>
                        <Input autoComplete='off' className='input-field' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired className='mb-2 mt-3'>
                        <FormLabel fontSize={14}>Date of Birth</FormLabel>
                        <Input autoComplete='off' className='input-field' type='date' onChange={(e) => setDOB(e.target.value)} />
                    </FormControl>
                    <div className='mb-2 mt-3'>
                        <FormControl isRequired>
                            <FormLabel fontSize={14}>Gender</FormLabel>
                            <RadioGroup onChange={setGender}>
                                <Stack spacing={4} direction='row'>
                                    <Radio colorScheme='linkedin' value='Male'>Male</Radio>
                                    <Radio colorScheme='linkedin' value='Female'>Female</Radio>
                                    <Radio colorScheme='linkedin' value='Other'>Other</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <FormControl isRequired className='mb-2 mt-3 d-flex justify-content-between align-items-center'>
                        <FormLabel className='' style={{ fontWeight: "550" }}>Document</FormLabel>
                        <Button colorScheme='linkedin' size='xs' onClick={onOpen}>Upload Document</Button>
                    </FormControl>

                    <div className='mt-4'>
                        <Button isLoading={loading} spinner={<BeatLoader size={7} color='white' />} size='sm' background='#4990e7' color='white' _hover={{ background: '#0b5ed7' }} width='100%' type='submit'>Submit</Button>
                    </div>
                </Form>
            </div>

            <Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={handleCancel}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>Choose Option</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        {showQRCode ? (
                            <QRcontainer uniqueCode={uniqueCode} onTimerComplete={handleCancel} />
                        ) : (
                            <OptionChooser uniqueCode={uniqueCode} handleShowQRCode={handleShowQRCode} setLoading2={setLoading2} />
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={loading2} spinner={<BeatLoader size={7} color='white' />} colorScheme='blue' onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default SampleForm;
