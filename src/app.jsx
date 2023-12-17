import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AddTransaction } from './addTransaction/addTransaction';
import './app.css';
import { Home } from './home/home';
import { AuthState } from './login/authState';
import { Login } from './login/login';

export default function App() {
    const [currentAuthState, setAuthState] = React.useState(AuthState.Unknown);
    let userName = localStorage.getItem('userName') || '';


    useEffect(() => {
        console.log('current auth state', currentAuthState);
        checkAuthState();
    });

    const checkAuthState = () => {
        console.log('check auth state');
        if (userName) {
            setAuthState(AuthState.Authenticated);
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
        setAuthState(status)
    }

    return (
    <BrowserRouter>
    {(currentAuthState === AuthState.Unauthenticated || currentAuthState === AuthState.Unknown) && <Login onLoginChange={(status) => {changeAuthentication(status)}}/>}
    {currentAuthState === AuthState.Authenticated && (
        <>
            <nav className="nav-header">
                <div className="header-content">
                    <h2 className='title'>Simple.</h2>
                    {/* <NavLink className='nav-link' to='/' onClick={() => handleLogOut()}>Log out</NavLink> */}
                    <Button size="md" className='nav-button' onClick={() => handleLogOut()}>Log out</Button>
                    <NavLink className='nav-link' to='addTransaction'>Add Transaction</NavLink>
                    <NavLink className='nav-link' to='/home'>Home</NavLink>
                </div>
            </nav>

            <Routes>
                <Route path='/home' element={<Home />} exact />
                <Route path='/' element={<Home />} exact />
                <Route path='/' element={<Login />} exact />
                <Route path='/addTransaction' element={<AddTransaction />} exact />
            </Routes>
        </>
    )}
    </BrowserRouter>
    )
}