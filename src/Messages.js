// src/Messages.js
import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "sms_messages");

    // Fetching data from Firebase Realtime Database
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("Fetched messages data:", data);  // Debugging log

        const messagesList = Object.entries(data).map(([id, value]) => ({
          id,
          sender: value.sender,
          messageBody: value.messageBody,
          timestamp: value.timestamp ? new Date(value.timestamp).toLocaleString() : "N/A", // Safeguard for invalid timestamps
        }));
        setMessages(messagesList);
      } else {
        console.log("No messages found in database.");
        setMessages([]);  // If no data, set messages to empty array
      }
    }, (error) => {
      console.error("Error fetching messages:", error);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className="container mt-5">Messages</h2>
      <Table striped bordered hover responsive className="container mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Message Body</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.sender}</td>
                <td>{message.messageBody}</td>
                <td>{message.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No messages available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Messages;
