import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './ContactForm.css';
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/sendmail', { name, email, message })
      .then((res) => {
        setName('');
        setEmail('');
        setMessage('');
        setSuccessMessage(res.data.message);
        setErrorMessage('');
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <Container>
      <h1>Complaint & Suggestion Box</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName" className="mb-3" >
          <Form.Label>Name    : </Form.Label>
          <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address   :  </Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicMessage" className="mb-3">
          <Form.Label>Message   :  </Form.Label>
          <div className='message'>
          <Form.Control as="textarea" rows={5} placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Container>
  );
};

export default ContactForm;
