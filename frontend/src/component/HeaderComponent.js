import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUser');
    if (username) {
      setLoggedInUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Remove username from local storage on logout
    setLoggedInUser('');
    // perform other logout actions if needed
    navigate('/'); 
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"><img src="./assets/smol.png" alt="Tsukiden" className='navlogo'/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {loggedInUser ? (
            <>
              <Nav.Link>Welcome, {loggedInUser}</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent;
