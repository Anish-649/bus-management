import React from "react";
import "./Home.css";


const Home = () => {
  return (
    <>
    
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Bus Management System</h1>
        <p className="home-subtitle">
          Book your buses, manage schedules, and travel smarter.
        </p>

        <button className="home-btn">Book Now</button>
      </div>
    </div>
    </>
  );
};

export default Home;
