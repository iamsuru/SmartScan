import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SuccessMessage = () => {
    const { popUp } = useParams();

    const styles = {
        content: {
            width: '100%',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#68b5db67',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
        },
        h1: {
            color: '#4caf50',
        },
        p: {
            marginTop: '10px',
            color: '#333',
        },
        a: {
            color: '#4caf50',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        aHover: {
            textDecoration: 'underline',
        },
    };

    const containerStyle = {
        height: popUp === 'showTrue' ? '100vh' : '85vh',
        width: '300px',
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={containerStyle}>
            <div style={styles.content}>
                <h1 style={styles.h1}>Success!</h1>
                <p style={styles.p}>Uploaded Successfully!</p>
                {popUp === 'show' && <p id="redirectLink"><Link to="/home-page" style={styles.a}>Click Here</Link></p>}
            </div>
        </div>
    );
};

export default SuccessMessage;
