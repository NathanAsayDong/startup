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
    <div className='body'>
        <nav className="nav-header">
            <div className="header-content">
                <h2>Simple.</h2>
                <NavLink className='nav-link' to='login'>Log out</NavLink>
                <NavLink className='nav-link' to='addTransaction'>Add Transaction</NavLink>
            </div>
        </nav>

        <Home />


        <Routes>
            <Route path='/login' element={<Login />} exact />
            <Route path='/addTransaction' element={<AddTransaction />} exact />
        </Routes>

    </div>
    </BrowserRouter>
    );
}