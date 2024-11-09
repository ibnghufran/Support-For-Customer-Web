// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/dashboard" className="navbar-brand">Admin</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/new-entries" className="nav-link">New Entries</Link>
            </li>
            <li className="nav-item">
              <Link to="/messages" className="nav-link">Messages</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact Developers</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
