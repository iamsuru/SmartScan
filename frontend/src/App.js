import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegistrationPage from './components/RegistrationPage';
import { HomePage } from './components/HomePage';
import MobileUploader from './components/MobileUploader';
import SuccessMessage from './components/SuccessMessage';

const App = () => {
  const location = useLocation();
  const showNavigationBar = () => {
    return location.pathname !== '/upload';
  };

  const hideNavBar = location.pathname.startsWith('/uploadedSuccessfully/showTrue');
  const host = window.location.origin
  return (
    <div className='bg-img'>
      {host === "https://smartscan-web.netlify.app" ? (
        <>
          {!hideNavBar && showNavigationBar() && <NavBar />}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<RegistrationPage />} />
            <Route path='/home-page' element={<HomePage />} />
            <Route path='/upload' element={<MobileUploader />} />
            <Route path='/uploadedSuccessfully/:popUp' element={<SuccessMessage />} />
          </Routes>
        </>
      ) : (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
          <h2 className='fw-bolder'>This Service is deployed on</h2>
          <h4 className='mb-4 fw-bold'>https://smartscan-web.netlify.app</h4>
          <a href='https://smartscan-web.netlify.app' className='btn btn-primary' role='button'>I will take you there...</a>
        </div>
      )}

    </div>
  );
};

export default App;
