import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AddTransaction } from './addTransaction/addTransaction';
import './app.css';
import { Home } from './home/home';
import { Login } from './login/login';



export default function App() {
    return (
    <BrowserRouter>
        <nav className="nav-header">
            <div className="header-content">
                <h2 className='title'>Simple.</h2>
                <NavLink className='nav-link' to='login'>Log out</NavLink>
                <NavLink className='nav-link' to='addTransaction'>Add Transaction</NavLink>
                <NavLink className='nav-link' to='/'>Home</NavLink>
            </div>
        </nav>
        
        <Routes>
            <Route path='/' element={<Home />} exact />
=           <Route path='/login' element={<Login />} exact />
            <Route path='/addTransaction' element={<AddTransaction />} exact />
        </Routes>

    </BrowserRouter>
    );
}