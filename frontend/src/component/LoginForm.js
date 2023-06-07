//vincent de lara
import React, { useState } from 'react';
import Userservice from '../service/Userservice';
import { Form, Button } from 'react-bootstrap';
import '../LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
const [passwordError, setPasswordError] = useState(false);
const [inva, setinvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !password 
    ) {
      setError('Please fill in all required fields');
      setTimeout(() => setError(''), 5000);

      setUsernameError(!username);
      setPasswordError(!password);
      
      setTimeout(() => setUsernameError(''), 5000);
      setTimeout(() => setPasswordError(''), 5000);

      return;
    }


    try {
      const response = await Userservice.getUserByUsername(username);
      if (response.data.password === password) {
        // Login successful
        setError('');
        localStorage.setItem('loggedInUser', username); // Store username in local storage
        if (response.data.role === 'Approver') {
          window.location.href ='/approver';
        } else {
          window.location.href ='/list';
        }
      } else {
        setinvalid('Invalid username or password');
        setTimeout(() => setinvalid(''), 4000); // Reset error after 2.5 seconds
      }
    } catch (error) {
      setError('Please enter your credentials');
      setTimeout(() => setError(''), 4000); // Reset error after 2.5 seconds
    }
  };
  const handleCreateAccount = () => {
    window.location.href = '/register';
  };

  return (
    <div className="container123">
      <div>
        <img src="./assets/tsukiden.png" alt="Tsukiden" className="loglog" />
      </div>
      <form onSubmit={handleSubmit}>
        <h2 id="title" className="title">Welcome!</h2>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={username}
              className={`form-control login ${usernameError ? 'is-invalid' : ''} ${inva ? 'is-invalid' : ''}`}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3 pass" controlId="formBasicPassword">
            <Form.Control
              type="password"
              value={password}
              className={`form-control login ${passwordError ? 'is-invalid' : ''} ${inva ? 'is-invalid' : ''}`}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className={`error ${error ? 'error-red' : ''}`}>{error && <div>{error}</div>}</div>
        <div className={`error ${inva ? 'error-red' : ''}`}>{inva && <div>{inva}</div>}</div>
        <div className="logbutton">
          <Button variant="primary" type="submit" className="btn btn-primary">
            Sign In
          </Button>
        </div>
        <div className="create-account">
          Don't have an account?
          <a href="/register" className="create-account123" onClick={handleCreateAccount}>
            Create now
          </a>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;



//remember me and frogot password incase needed
/* 

const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

 const handleForgotPassword = () => {
    // Implement the logic for handling forgot password here
  };



<div className="forgot-password">
            <a href="#" className="forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </a>
          </div>  
          

           <div className='rememberforgot'>
          <div className="form-check remember-me">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>


        </div>
          
          */