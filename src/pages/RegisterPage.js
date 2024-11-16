import React from 'react'
import { useState } from 'react';
import NavbarOne from './NavbarOne';

const RegisterPage = () => {
  const [details, setDetails] = useState({ name: "", age: "", phoneNumber: "", email: "", username: "", password: "" });

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

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Username:', details.username);
  console.log('Password:', details.password);
  console.log('Name:', details.name);
  console.log('Age:', details.age);
  console.log('Phone Number:', details.phoneNumber);
  console.log('Email:', details.email);
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
      </form>
    </div>
  )
}

export default RegisterPage
