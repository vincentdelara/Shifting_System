import React, { useState } from 'react';
import Userservice from '../service/Userservice';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../RegistrationForm.css';

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
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

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

  const handleCreateAccount = () => {
    window.location.href = '/';
  };

  const handleShowTermsModal = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <div>
   
      <h2 className="title CA">Create Account</h2>

    <form onSubmit={handleSubmit} className="custom-control reg">
      
      <div>
        <div>
          <Form.Group controlId="firstname">
            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              className="form-control reg"
            />
          </Form.Group>
        </div>
        <Form>
          <Row>
            <Col>
              <div>
                <Form.Group controlId="middlename">
                  <Form.Control
                    type="text"
                    value={middlename}
                    onChange={(e) => setMiddlename(e.target.value)}
                    placeholder="Middle Name"
                    className="form-control reg mid"
                  />
                </Form.Group>
              </div>
            </Col>
            <Col>
              <div>
                <Form.Group controlId="lastname">
                  <Form.Control
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Lastname"
                    className="form-control reg mid"
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
        <div>
          <Form.Group controlId="Username">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-control reg"
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="email">
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control reg"
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control reg"
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="confirmPassword">
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="form-control reg"
            />
          </Form.Group>
        </div>
        <div>
          <Form>
            <Row>
              <Col>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn btn-success drop">
                      Business Unit
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropmenu'>
                      <Dropdown.Item onClick={() => setBusiness_unit('')}>Select Business Unit</Dropdown.Item>
                      <Dropdown.Item onClick={() => setBusiness_unit('Developver')}>Developver</Dropdown.Item>
                      <Dropdown.Item onClick={() => setBusiness_unit('QA')}>QA</Dropdown.Item>
                      <Dropdown.Item onClick={() => setBusiness_unit('BA')}>BA</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
              <Col>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn btn-success drop">
                      Position
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropmenu'>
                      <Dropdown.Item onClick={() => setPosition('')}>Select Position</Dropdown.Item>
                      <Dropdown.Item onClick={() => setPosition('JES')}>JES</Dropdown.Item>
                      <Dropdown.Item onClick={() => setPosition('SEM')}>SEM</Dropdown.Item>
                      <Dropdown.Item onClick={() => setPosition('SDE')}>SDE</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Form>
        </div>

        <div className='but tp'>
          <Form.Group controlId="termsCheckbox">
            <Form.Check
              type="checkbox"
              label={
                <span>
                  I have read and agree to the{' '}
                  <a href="#" onClick={handleShowTermsModal} className='termscontent'>
                    Terms and Privacy Policy
                  </a>
                </span>
              }
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
          </Form.Group>
        </div>

        <Modal show={showTermsModal} onHide={handleCloseTermsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Terms and Privacy Policy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Here are the terms and privacy policy content...</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTermsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className='but ca'>
          <Button variant="primary" type="submit" disabled={!termsChecked}  class="btn btn-primary cr8acc">
            Create Account
          </Button>
        </div>

        <div className="create-account">
          Already have an account?
          <a href="/" className="create-account123" onClick={handleCreateAccount}>
            Sign in now
          </a>
        </div>

        {error && <div>{error}</div>}
      </div>
    </form>
    </div>
  );
};

export default RegistrationForm;
