import React, { useContext,useState } from 'react';
import NavbarOne from './NavbarOne';
import apiRequest from './apiRequest';
import { useNavigate } from 'react-router-dom';
import AllContext from '../context/AllContext';
const RegisterPage = () => {
  const { setUserDetails } = useContext(AllContext)
  const [details, setDetails] = useState({ name: "", age: "", phoneNumber: "", email: "", username: "", password: "",plantLevel:0, friendsList:[], tasks:[] });
  const [userExists,setUserExists] = useState('')
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
    method:'POST',
    headers:{
      'Content-Type':'application/json'
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={details.name} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={details.age} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={details.phoneNumber} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={details.email} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={details.username} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={details.password} onChange={handleChange} required/>
        </div>
        <button type="submit">Register</button>
        {userExists && (
                <div className="error-popup">
                    <p>{userExists}</p>
                    <button onClick={() => setUserExists('')}>Close</button>
                </div>
            )}
      </form>
    </div>
  )
}

export default RegisterPage
