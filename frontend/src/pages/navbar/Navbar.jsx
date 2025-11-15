import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";   // optional styling file

export default function Navbar(){
  return (
    <nav className="navbar">
      <h2 className="logo">BusManage</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login" className="btn-login">Login</Link></li>
        <li><Link to="/signup" className="btn-signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};





