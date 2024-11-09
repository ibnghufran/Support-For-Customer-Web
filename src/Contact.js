// src/Contact.js
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram, faGithub, faYoutube, faPinterest, faSnapchat, faTiktok, faReddit } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [messageSent, setMessageSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setMessageSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const socialMediaLinks = [
    { icon: faFacebook, url: "https://www.facebook.com/techilyflybyig" },
    { icon: faTwitter, url: "https://x.com/techilyflybyig" },
    { icon: faLinkedin, url: "https://www.linkedin.com/company/techilyflybyig" },
    { icon: faInstagram, url: "https://www.instagram.com/techilyflybyig" },
    { icon: faGithub, url: "https://github.com/ibnghufran" },
    { icon: faYoutube, url: "https://www.youtube.com/channel/UCrQ9tWwT5vs5Dn4eGRbjnsA" },
  ];

  return (
    <div className="container mt-5">
        <Navbar />
      <h2>Contact Developer</h2>
      <p className="mb-4">Feel free to reach out with any questions, suggestions, or feedback!</p>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group as={Row} controlId="formName" className="mb-3">
          <Form.Label column sm="2">Name</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mb-3">
          <Form.Label column sm="2">Email</Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMessage" className="mb-3">
          <Form.Label column sm="2">Message</Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your message here"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">Send Message</Button>

        {messageSent && <p className="text-success mt-3">Thank you! Your message has been sent.</p>}
      </Form>

      <h4>Follow Us</h4>
      <div className="d-flex gap-3 mt-3">
        {socialMediaLinks.map((social, index) => (
          <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.5rem", color: "#333" }}>
            <FontAwesomeIcon icon={social.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
