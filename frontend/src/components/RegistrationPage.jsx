import React, { useState } from 'react'
import {
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react'
import { Form } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
const RegistrationPage = () => {
    const [name, setName] = useState()
    const [email_id, setEmail] = useState()
    const [password, setPassword] = useState()

    const toast = useToast()

    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim(), email_id: email_id.trim(), password: password })
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
                    navigate('/')
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
        } catch (error) {
            toast({
                title: error,
                status: 'danger',
                duration: "2000",
                isClosable: false,
                position: 'top'
            })
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center parent-container container'>
            <div className='form-container'>
                <Form onSubmit={register}>
                    <div className='mb-2'>
                        <FormLabel fontSize={14}>Full Name</FormLabel>
                        <Input className='input-field' type='text' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <FormLabel fontSize={14}>Email address</FormLabel>
                        <Input className='input-field' type='email'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mt-2 mb-2'>
                        <FormLabel fontSize={14}>Password</FormLabel>
                        <Input className='input-field' type='password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='mt-4'>
                        <Button width='100%' background='#4990e7' color='white' _hover={{ background: '#0b5ed7' }} type='submit'>Sign in!</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default RegistrationPage