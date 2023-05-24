import React, { useState } from 'react';
import Userservice from '../service/Userservice';

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [business_unit, setBusiness_unit] = useState('');
  const [position, setPosition] = useState('');

 
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Check if the username already exists
      const existingUser = await Userservice.getUserByUsernamereg(username);
      if (existingUser) {
        setError('Username already exists. Please choose a different username.');
        return;
      }

      await Userservice.registerUser({ firstname, lastname, username, email, password, business_unit, position });
      // Registration successful
      setFirstname('');
      setLastname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setBusiness_unit('');
      setPosition('');
      // Do something after successful registration
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>firstname:</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label>lastname:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div>
        <label>username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <label>business_unit:</label>
        <input
          type="text"
          value={business_unit}
          onChange={(e) => setBusiness_unit(e.target.value)}
        />
      </div>
      <div>
        <label>position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      
    
      <div>
        <button type="submit">Register</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default RegistrationForm;
