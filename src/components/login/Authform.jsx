import React, { useState } from 'react';
import axios from 'axios';
import './Authform.css'; // For styling

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('All fields are required!');
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        const endpoint = isLogin ? 'api/auth/login' : 'api/auth/signup';

        try {
            const response = await axios.post(`https://004firstapp-hrg4fka8epa4fbc5.centralindia-01.azurewebsites.net/${endpoint}`,{id : crypto.randomUUID() ,email,password,name:email});

            if (response !=null && response.data !=null && response.data != '') {
               // localStorage.setItem('token', response.data.token);
                window.location.href = '/dashboard';
            } else {
                setError(response.data.message || 'Something went wrong.');
            }
        } catch (err) {
            setError('Failed to process request. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-toggle">
                <button 
                    className={isLogin ? 'active' : ''} 
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button 
                    className={!isLogin ? 'active' : ''} 
                    onClick={() => setIsLogin(false)}
                >
                    Signup
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

                {error && <p className="error">{error}</p>}

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}

                <button type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;