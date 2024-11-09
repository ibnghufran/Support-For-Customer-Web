// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewEntries from "./NewEntries";
import Messages from "./Messages";  // Import the Messages component
import Settings from "./Settings";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-entries" element={<NewEntries />} />
        <Route path="/messages" element={<Messages />} />  {/* Route to Messages */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
