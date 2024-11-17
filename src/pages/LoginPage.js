import React, { useContext, useEffect, useState } from 'react';
import NavbarOne from './NavbarOne';
import AllContext from '../context/AllContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { getUsersData, users, setUserDetails } = useContext(AllContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUsersData();
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        console.log(users);
        const userExists = users.some(user => {
            if (username === user.username) {
                if (password === user.passwordHash) {
                    console.log('user logged in successfully');
                    setUserDetails(user);
                    navigate('/yourtasks');
                    return true;
                } else {
                    console.log('password is incorrect!');
                    setErrorMessage('Password is incorrect!');
                    return true;
                }
            }
            return false;
        });
        if (!userExists) {
            console.log("user doesn't exist");
            setErrorMessage("User doesn't exist");
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
        console.log(`${name}: ${value}`);
    };

    return (
        <div>
            <NavbarOne />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && (
                <div className="error-popup">
                    <p>{errorMessage}</p>
                    <button onClick={() => setErrorMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
