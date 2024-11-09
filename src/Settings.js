// src/Settings.js
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { updateProfile, updatePassword } from "firebase/auth";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

const Settings = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "");
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Handle Profile Update
  const handleProfileUpdate = () => {
    updateProfile(auth.currentUser, { displayName })
      .then(() => setMessage({ type: "success", text: "Profile updated successfully!" }))
      .catch((error) => setMessage({ type: "error", text: error.message }));
  };

  // Handle Password Change
  const handleChangePassword = () => {
    if (newPassword) {
      updatePassword(auth.currentUser, newPassword)
        .then(() => setMessage({ type: "success", text: "Password changed successfully!" }))
        .catch((error) => setMessage({ type: "error", text: error.message }));
    } else {
      setMessage({ type: "error", text: "Password cannot be empty." });
    }
  };

  return (
    <div className="container mt-5">
        <Navbar />
      <h2>Settings</h2>

      {message.text && (
        <Alert variant={message.type === "error" ? "danger" : "success"}>
          {message.text}
        </Alert>
      )}

      <Form className="mt-4">
        <h4>Profile Settings</h4>
        <Form.Group className="mb-3" controlId="formDisplayName">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleProfileUpdate}>
          Update Profile
        </Button>

        <hr />

        <h4>Password Settings</h4>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleChangePassword}>
          Change Password
        </Button>

        <hr />

        {/* Additional admin settings can go here */}
        <h4>Other Settings</h4>
        <p>Additional settings related to your application can be added here.</p>
      </Form>
    </div>
  );
};

export default Settings;
