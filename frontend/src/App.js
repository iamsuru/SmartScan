import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import RegistrationPage from './components/RegistrationPage';
import { HomePage } from './components/HomePage';
import MobileUploader from './components/MobileUploader';

const App = () => {
  const location = useLocation();

  const showNavigationBar = () => {
    return location.pathname !== '/upload';
  };

  return (
    <div className='bg-img'>
      {showNavigationBar() && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/home-page' element={<HomePage />} />
        <Route path='/upload' element={<MobileUploader />} />
      </Routes>
    </div>
  );
};

export default App;
