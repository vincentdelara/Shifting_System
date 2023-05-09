//vincentdelara
import React, { useState } from 'react';
import Userservice from '../service/Userservice';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Userservice.getUserByUsername(username);
      if (response.data.password === password) {
        // Login successful
        setError('');
        window.location.href = "/list";
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
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
        <button type="submit">Login</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default LoginForm;
