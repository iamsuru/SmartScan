import React, { useEffect } from 'react'
import SampleForm from './SampleForm'
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
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
    )
}

const HomePage = () => {
    const navigate = useNavigate()
    const { loadingForLogout } = useUser()
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
                if (response.status === 410) {
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
    }, [navigate]);
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
    )
}



export { HomePage };