import React, { useEffect, useCallback } from 'react';
import SampleForm from './SampleForm';
import { useNavigate } from 'react-router-dom';
import { Spinner, useToast } from '@chakra-ui/react';
import { useUser } from '../context/UserContext';

const Preview = () => {
    return (
        <div id='previewDiv' style={{ height: '0', width: '0' }} className='mt-5'>
            <iframe
                id='previewDocument'
                src=''
                title="Document Preview"
                height='100%'
                width='100%'
            ></iframe>
        </div>
    );
}

const HomePage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { loadingForLogout } = useUser();

    const showToast = useCallback((message, status, duration, isClosable, position) => {
        toast({
            title: message,
            status: status,
            duration: duration,
            isClosable: isClosable,
            position: position
        });
    }, [toast]);

    useEffect(() => {
        const isTokenExpired = async (token) => {
            try {
                const response = await fetch('/api/auth/isTokenExpired', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();
                if (response.status === 410) {
                    showToast(data.message, 'error', 3000, false, 'top');
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentUserToken');
                    navigate('/');
                } else if (response.status === 500) {
                    console.log('Internal server error');
                }
            } catch (error) {
                console.log(error);
            }
        };

        const token = JSON.parse(localStorage.getItem('currentUserToken'));
        if (token) {
            isTokenExpired(token);
        } else {
            navigate('/');
        }
    }, [showToast, navigate]);

    return (
        <>
            {loadingForLogout && <div id='fullScreenLoader'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#0b5ed7'
                    size='xl'
                />
            </div>
            }
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
        </>
    );
}

export { HomePage };