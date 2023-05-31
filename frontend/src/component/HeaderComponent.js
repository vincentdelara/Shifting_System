//vincent de lara
import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import '../HeaderComponent.css';

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
    window.location.reload(); // Refresh the browser
  };
  

  return (
    <Navbar>
      <Navbar.Brand href="/"><img src="./assets/smol.png" alt="Tsukiden" className='navlogo'/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
  {loggedInUser ? (
    <>
      <Nav.Link>Welcome, {loggedInUser}</Nav.Link>
      <Nav.Link onClick={handleLogout}>
        <FiLogOut className='logout' /> 
      </Nav.Link>
    </>
  ) : (
    <>
      <Nav.Link href="/login">
      
      </Nav.Link>
      <Nav.Link href="/register"></Nav.Link>
    </>
  )}
</Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default HeaderComponent;
