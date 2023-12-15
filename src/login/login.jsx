import 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AuthState } from './authState';
import './login.css';


export function Login({ loginService, onLoginChange }) {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);


    const loginOrCreate = async (endpoint) => {
            try {
            const response = await fetch(endpoint, {
                method: 'post',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            });
        
            if (response.ok) {
                console.log('Login successful');
                localStorage.setItem('userName', email.split('@')[0]);
                console.log('username set', localStorage.getItem('userName'));
                onLoginChange(AuthState.Authenticated);
            } else {
                const body = await response.json();
                setError(`⚠ Error: ${body.msg}`);
                AuthState.Unauthenticated;
            }
            } catch (error) {
            setError(error.message);
            }
        };

    const handleLogin = async () => {
        try {
            await loginOrCreate(`/api/auth/login`);
        // If successful, you can redirect or perform other actions
        } catch (error) {
        setError(error.message);
        }
    };

    const handleCreate = async () => {
        try {
            await loginOrCreate(`/api/auth/create`);
        // If successful, you can redirect or perform other actions
        } catch (error) {
        setError(error.message);
        }
    }

    const handleNateTest = async () => {
        console.log(localStorage.getItem('userName'));
    }

return (
    <>
            <div className='title-container'>
                <p className='title-top'>Budgeting, made</p>
                <h1 className='title-bottom'>Simple.</h1>
            </div>
            <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-4">
            <form className="mt-5">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Username:
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <Button variant='primary' onClick={() => handleLogin()}>
                Login
                </Button>
                <Button variant='primary' className="button2" onClick={() => handleCreate()}>
                Create
                </Button>
                {error && <p className="text-danger mt-3">{error}</p>}
            </form>
            </div>
            </div>
    </>
    );
}
