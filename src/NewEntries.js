// src/NewEntries.js
import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "./firebaseConfig";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

const NewEntries = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);

  useEffect(() => {
    // Fetch the entries from Firebase Realtime Database
    const fetchEntries = () => {
      const entriesRef = ref(database, "user_details"); // Make sure the path is correct
      onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entriesList = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          console.log("Fetched entries:", entriesList);  // Debugging log
          setEntries(entriesList);
        } else {
          console.log("No data found");
          setEntries([]);  // If no data, set entries as an empty array
        }
      }, (error) => {
        console.log("Error fetching data:", error);
      });
    };

    fetchEntries();
  }, []);

  const handleDelete = (id) => {
    const entryRef = ref(database, `formSubmissions/${id}`);
    remove(entryRef)
      .then(() => {
        setEntries(entries.filter(entry => entry.id !== id));  // Remove from state after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const handleView = (entry) => {
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <Navbar />
      <h2>New Entries</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Complaint</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.fullName}</td>
                <td>{entry.mobileNumber}</td>
                <td>{entry.complaint}</td>
                <td>
                  <Button variant="primary" onClick={() => handleView(entry)}>View</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(entry.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No entries available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEntry && (
            <div>
              <p><strong>ID:</strong> {currentEntry.id}</p>
              <p><strong>Full Name:</strong> {currentEntry.fullName}</p>
              <p><strong>Mobile Number:</strong> {currentEntry.mobileNumber}</p>
              <p><strong>Complaint:</strong> {currentEntry.complaint}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewEntries;
