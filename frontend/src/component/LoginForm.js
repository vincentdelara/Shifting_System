import React, { useState } from 'react';
import Userservice from '../service/Userservice';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



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
      localStorage.setItem('loggedInUser', username); // Store username in local storage
      window.location.href = "/list";
    } else {
      setError('Invalid username or password');
    }
  } catch (error) {
    setError('Invalid username or password');
  }
};


  return (
    <div className='container123'>
      <div>
        <img src="./assets/tsukiden.png" alt="Tsukiden" className='loglog' />
      </div>
      <form onSubmit={handleSubmit}>
      <h2 class="title">Welcome!</h2>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>


        </div>
        <div>
        <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Control
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</Form.Group>

        </div>
        <div>
        <Button variant="primary" type="submit">
  Sign In
</Button>

        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
