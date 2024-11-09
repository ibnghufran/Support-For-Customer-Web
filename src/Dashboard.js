// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, auth } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";


const Dashboard = () => {
  const [formCounts, setFormCounts] = useState({ today: 0, week: 0, month: 0, year: 0 });
  const navigate = useNavigate();

  const fetchData = () => {
    const submissionsRef = ref(database, "user_details");

    onValue(submissionsRef, (snapshot) => {
      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;
      let yearCount = 0;
      const now = new Date();

      snapshot.forEach((childSnapshot) => {
        const submission = childSnapshot.val();
        const timestamp = new Date(submission.timestamp);

        // Calculate counts based on periods
        if (timestamp.toDateString() === now.toDateString()) todayCount++;
        if (timestamp >= new Date(now - 7 * 24 * 60 * 60 * 1000)) weekCount++;
        if (timestamp >= new Date(now - 30 * 24 * 60 * 60 * 1000)) monthCount++;
        if (timestamp.getFullYear() === now.getFullYear()) yearCount++;
      });

      setFormCounts({ today: todayCount, week: weekCount, month: monthCount, year: yearCount });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="my-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Form Submissions (Today)</h5>
              <p className="card-text">{formCounts.today}</p>
              <Link to="/new-entries" className="btn btn-primary">View Entries</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Form Submissions (Past Week)</h5>
              <p className="card-text">{formCounts.week}</p>
              <Link to="/new-entries" className="btn btn-primary">View Entries</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Form Submissions (Past 30 Days)</h5>
              <p className="card-text">{formCounts.month}</p>
              <Link to="/new-entries" className="btn btn-primary">View Entries</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Form Submissions (This Year)</h5>
              <p className="card-text">{formCounts.year}</p>
              <Link to="/new-entries" className="btn btn-primary">View Entries</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
