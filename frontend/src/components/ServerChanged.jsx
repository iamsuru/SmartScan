import React, { useEffect } from 'react';

const ServerChanged = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = 'https://smartscan-web.netlify.app';
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <div style={styles.container}>
                <h1 style={styles.header}>Service Moved</h1>
                <p style={styles.message}>
                    Our service has been moved to a new server for better performance and reliability.
                    You will be automatically redirected to the new location in less than 10 seconds.
                </p>
                <p style={styles.message}>
                    Please click the link below to be redirected to the new site:
                </p>
                <a style={styles.link} href="https://smartscan-web.netlify.app">Go to New Server</a>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Rubik",
        textAlign: 'center',
        padding: '50px',
        maxWidth: '600px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    message: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    link: {
        fontSize: '20px',
        marginTop: '20px',
        color: "#0b5ed7",
        textDecoration: "underline"
    },
};

export default ServerChanged;