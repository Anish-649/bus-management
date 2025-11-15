import React from "react";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>Search buses, view routes, book tickets, and manage your profile.</p>

      <div className="dashboard-cards">
        <div className="dash-card">
          <h3>Total Bookings</h3>
          <p>8</p>
        </div>

        <div className="dash-card">
          <h3>Upcoming Trips</h3>
          <p>2</p>
        </div>

        <div className="dash-card">
          <h3>Completed Trips</h3>
          <p>6</p>
        </div>
      </div>
    </div>
  );
}
