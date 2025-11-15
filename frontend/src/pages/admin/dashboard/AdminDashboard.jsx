import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    routes: 0,
    buses: 0,
    schedules: 0,
    customers: 0,
    bookings: 0,
    todayBookings: 0,
  });

  const loadStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>{stats.routes}</h3>
          <p>Total Routes</p>
        </div>

        <div className="card">
          <h3>{stats.buses}</h3>
          <p>Total Buses</p>
        </div>

        <div className="card">
          <h3>{stats.schedules}</h3>
          <p>Total Schedules</p>
        </div>

        <div className="card">
          <h3>{stats.customers}</h3>
          <p>Total Customers</p>
        </div>

        <div className="card">
          <h3>{stats.bookings}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="card today">
          <h3>{stats.todayBookings}</h3>
          <p>Today’s Bookings</p>
        </div>
      </div>
    </div>
  );
}
