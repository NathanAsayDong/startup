import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AddTransaction } from './addTransaction/addTransaction';
import './app.css';
import { Home } from './home/home';
import { AuthState } from './login/authState';
import { Login } from './login/login';

export default function App() {
    let currentAuthState = AuthState.Unknown;
    let userName = localStorage.getItem('userName') || '';

    const checkAuthState = () => {
        if (userName) {
            currentAuthState = AuthState.Authenticated;
        }
    }

    const setUserName = (name) => {
        userName = name;
    }
    
    const handleLogOut = () => {
        localStorage.removeItem('userName');
        setAuthState(AuthState.Unauthenticated);
        window.location.reload();
    }

    const changeAuthentication = (status) => {
        console.log('change auth status')
        setUserName(localStorage.getItem('userName'));
        currentAuthState = AuthState.Authenticated;
    }

    checkAuthState();

    return (
    <BrowserRouter>
    {(currentAuthState === AuthState.Unauthenticated || currentAuthState === AuthState.Unknown) && <Login onLoginChange={(status) => {changeAuthentication(status)}}/>}
    {currentAuthState === AuthState.Authenticated && (
        <>
            <nav className="nav-header">
                <div className="header-content">
                    <h2 className='title'>Simple.</h2>
                    <NavLink className='nav-link' to='/' onClick={() => handleLogOut()}>Log out</NavLink>
                    <NavLink className='nav-link' to='addTransaction'>Add Transaction</NavLink>
                    <NavLink className='nav-link' to='/home'>Home</NavLink>
                </div>
            </nav>

            <Routes>
                <Route path='/home' element={<Home />} exact />
                <Route path='/' element={<Login />} exact />
                <Route path='/addTransaction' element={<AddTransaction />} exact />
            </Routes>
        </>
    )}
    </BrowserRouter>
    )
}