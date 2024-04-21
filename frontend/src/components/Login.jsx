import React, { useEffect, useState } from 'react'
import {
    useToast,
    FormLabel,
    Input,
    Button,
    FormControl,
} from '@chakra-ui/react'
import { Form } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('currentUserToken'));

        if (token) {
            navigate('/home-page')
        }
    }, [navigate])

    const authenticate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_id: email.trim(), password: password })
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
                localStorage.setItem('currentUser', JSON.stringify(data.auth))
                localStorage.setItem('currentUserToken', JSON.stringify(data.token))
                setTimeout(() => {
                    navigate('/home-page')
                }, 2000)
            }
            else if (response.status === 401) {
                toast({
                    title: data.message,
                    status: 'warning',
                    duration: "2000",
                    isClosable: false,
                    position: 'top'
                })
            }
            else if (response.status === 404) {
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
    }
    return (
        <div className='d-flex justify-content-center align-items-center parent-container container'>
            <div className='form-container'>
                <Form onSubmit={authenticate}>
                    <FormControl isRequired className='mb-2'>
                        <FormLabel fontSize={14}>Email address</FormLabel>
                        <Input autoComplete='off' className='input-field' type='email' onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired className='mt-2 mb-2'>
                        <FormLabel fontSize={14}>Password</FormLabel>
                        <Input className='input-field' type='password'
                            onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <div className='mt-4'>
                        <Button isLoading={loading} spinner={<BeatLoader size={7} color='white' />} width='100%' background='#4990e7' color='white' _hover={{ background: '#0b5ed7' }} type='submit'>Let me in!</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login