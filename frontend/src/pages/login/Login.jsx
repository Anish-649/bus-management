import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      // ⭐ CUSTOMER LOGIN
      if (role === "customer") {
        res = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password
        });

        // Backend returns ONLY: message + token
      const token = res.data.token;

localStorage.setItem("token", token);

// Extract the user ID from JWT
const payload = JSON.parse(atob(token.split(".")[1]));
localStorage.setItem("user_id", payload.id);

navigate("/user");
        return;
      }

      // ⭐ ADMIN LOGIN
if (role === "admin") {
    console.log(formData.username);
  const res = await axios.post("http://localhost:5000/auth/admin/login", {
    username: formData.username,
    password: formData.password,
  });

  localStorage.setItem("admin_id", res.data.admin_id);
  localStorage.setItem("admin_username", res.data.username);

  navigate("/admin");
  return;
}


    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-tabs">
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            className={role === "customer" ? "active" : ""}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{role.toUpperCase()} Login</h2>

         {role === "admin" && (
  <>
    <input
      type="text"
      name="username"
      placeholder="Admin Username"
      value={formData.username}
      onChange={handleChange}
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
    />
  </>
)}


          {role === "customer" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Customer Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">Login</button>

          {role === "customer" && (
            <p className="signup-link">
              Don't have an account? <a href="/signup">Signup</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
