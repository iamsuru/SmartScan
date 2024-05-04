import { QRCodeSVG } from 'qrcode.react';
import React, { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';

function QRcontainer(props) {
    const [seconds, setSeconds] = useState(90);
    const [id, setId] = useState()

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userId = currentUser._id;
        setId(userId)
    }, [])

    useEffect(() => {
        if (seconds > 0) {
            const countdown = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => {
                clearInterval(countdown);
            };
        }
    }, [seconds]);

    useEffect(() => {
        if (seconds === 0 && props.onTimerComplete) {
            props.onTimerComplete();
        }
    }, [seconds, props]);
    const progressValue = seconds > 0 ? (seconds / 60) * 100 : 0;

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <QRCodeSVG value={`http://192.168.179.2:3000/upload?ID=${id}&location=${props.uniqueCode}`} />
            <div className='mt-4'>
                <label style={{ color: 'blue' }}>Remaining Time: {`${seconds} seconds`}</label>
                <Progress value={progressValue} size='xs' colorScheme='blue' className='mt-3' />
            </div>
        </div>
    );
}

export default QRcontainer;