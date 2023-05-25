import React, { useState } from 'react';
import Userservice from '../service/Userservice';
import { Form, Button } from 'react-bootstrap';

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [middlename, setMiddlename] = useState('');
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

      await Userservice.registerUser({
        firstname,
        middlename,
        lastname,
        username,
        email,
        password,
        business_unit,
        position,
      });

      
      setFirstname('');
      setMiddlename('');
      setLastname('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setBusiness_unit('');
      setPosition('');

    
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <div>
        <Form.Group controlId="firstname" className="custom-control123">

          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder='First Name'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="middlename">

          <Form.Control
            type="text"
            value={middlename}
            onChange={(e) => setMiddlename(e.target.value)}
            placeholder='Middle Name'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="lastname">
    
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder='Lastname'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="Username">
       
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="email">
  
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="password">
        
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="confirmPassword">
         
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="business_unit">
          
          <Form.Control
            type="text"
            value={business_unit}
            onChange={(e) => setBusiness_unit(e.target.value)}
            placeholder='Business Unit'
          />
        </Form.Group>
      </div>
      <div>
        <Form.Group controlId="position">
      
          <Form.Control
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder='Position'
          />
        </Form.Group>
      </div>

      <div>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </div>
      {error && <div>{error}</div>}
      </div>
    </form>
  );
};

export default RegistrationForm;
