import React, { useContext, useState } from 'react';
import NavbarOne from './NavbarOne';
import apiRequest from './apiRequest';
import { useNavigate } from 'react-router-dom';
import AllContext from '../context/AllContext';
import '../stylesheets/RegisterPage.css';

const RegisterPage = () => {
  const { setUserDetails } = useContext(AllContext)
  const [details, setDetails] = useState({ name: "", age: "", phoneNumber: "", email: "", username: "", password: "", plantLevel: 0, friendsList: [], tasks: [] });
  const [userExists, setUserExists] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setDetails({ ...details, username: value });
    } else if (name === 'password') {
      setDetails({ ...details, password: value });
    } else if (name === 'name') {
      setDetails({ ...details, name: value });
    } else if (name === 'age') {
      setDetails({ ...details, age: value });
    } else if (name === 'phoneNumber') {
      setDetails({ ...details, phoneNumber: value });
    } else if (name === 'email') {
      setDetails({ ...details, email: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Username:', details.username);
    console.log('Password:', details.password);
    console.log('Name:', details.name);
    console.log('Age:', details.age);
    console.log('Phone Number:', details.phoneNumber);
    console.log('Email:', details.email);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    }

    const url = "http://localhost:8080/api/users"

    try {
      const data = await apiRequest(url, options);
      if (data) {
        console.log('Error in creating user:', data);
        setUserExists(data)
      } else {
        setUserDetails(details);
        navigate('/yourtasks');
      }
    } catch (error) {
      console.error('Error in creating user:', error);
    }

  };

  return (
    <div>
      <NavbarOne />
      <div className="register-container">
        <form className='reg-form' onSubmit={handleSubmit}>
          <div className='register-form'>
            <div className='register-form-section'>
              <div className="label">Name</div>
              <div>
                <input type="text" id="name" name="name" value={details.name} onChange={handleChange} required />
              </div>
              <div className="label">Age</div>
              <div>
                <input type="number" id="age" name="age" value={details.age} onChange={handleChange} required />
              </div>
              <div className="label">Phone Number</div>
              <div>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={details.phoneNumber} onChange={handleChange} required />
              </div>
            </div>
            <div className='register-form-section'>
              <div className="label">Email</div>
              <div>
                <input type="email" id="email" name="email" value={details.email} onChange={handleChange} required />
              </div>
              <div className="label">Username</div>
              <div>
                <input type="text" id="username" name="username" value={details.username} onChange={handleChange} required />
              </div>
              <div className="label">Password</div>
              <div>
                <input type="password" id="password" name="password" value={details.password} onChange={handleChange} required />
              </div>
            </div>
            </div>
          <button type="submit">Register</button>
        </form>
        {userExists && (
          <div className="error-popup">
            <p>{userExists}</p>
            <button onClick={() => setUserExists('')}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegisterPage
