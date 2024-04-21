import React, { useState } from 'react'
import { NavItem, NavbarBrand } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../context/UserContext'
const NavBar = () => {

    const navigate = useNavigate()

    const [token, setToken] = useState();

    const { setLoadingForLogout } = useUser()

    useEffect(() => {
        const tokenFromLocalStorage = JSON.parse(localStorage.getItem('currentUserToken'));
        setToken(tokenFromLocalStorage);
    }, [navigate]);



    const logoutHandler = () => {
        setLoadingForLogout(true)
        localStorage.removeItem('currentUserToken')
        localStorage.removeItem('currentUser')
        setTimeout(() => {
            navigate('/')
        }, 10000)

    }
    return (
        <nav className="navbar navbar-expand-sm nav-bg">
            <div className="container">
                <NavbarBrand className='logo nav-brand-logo' href='/'>SmartScan</NavbarBrand>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <NavItem>
                            <Link className='nav-nav-link mx-4' to='/'>Home</Link>
                        </NavItem>
                        {!token && <NavItem>
                            <Link className='nav-nav-link mx-4' to='/signup'>Signup</Link>
                        </NavItem>}
                        {token && <NavItem>
                            <Link className='nav-nav-link mx-4' to='/home-page'>Form</Link>
                        </NavItem>}
                        {token && <NavItem>
                            <div className='nav-nav-link mx-4' style={{ cursor: "pointer" }} onClick={logoutHandler}>Logout</div>
                        </NavItem>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar