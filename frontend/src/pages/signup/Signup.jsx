import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const CustomerSignup = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSignup}>
        <h2>Customer Signup</h2>

        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />

        <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default CustomerSignup;
