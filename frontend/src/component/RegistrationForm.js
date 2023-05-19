import React, { useState } from 'react';
import Userservice from '../service/Userservice';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

      await Userservice.registerUser({ username, password });
      // Registration successful
      setError('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      // Do something after successful registration
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
