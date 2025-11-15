import jwt from "jsonwebtoken";
import { db } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();


// ---------------- CUSTOMER SIGNUP ----------------
export const customerSignup = (req, res) => {
  const { name, mobile, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const sql =
      "INSERT INTO users (name, mobile, email, password) VALUES (?, ?, ?, ?)";
    const values = [name, mobile, email, password]; // <- PLAIN PASSWORD

    db.query(sql, values, (err) => {
      if (err) return res.json(err);
      return res.json({ message: "Signup successful" });
    });
  });
};


// ---------------- CUSTOMER LOGIN ----------------
export const customerLogin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = data[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, role: "customer" },
      process.env.JWT_SECRET
    );

    return res.json({ message: "Login successful", token });
  });
};


// ---------------- ADMIN LOGIN ----------------
export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM admin WHERE username = ?";

  db.query(q, [username], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", err });

    if (result.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    const admin = result[0];

    if (admin.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    res.json({
      message: "Admin login successful",
      admin_id: admin.admin_id,
      username: admin.username,
    });
  });
};


export const getUser = (req, res) => {
  const user_id = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", [user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    if (!result.length) return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  });
};

export const updateUser = (req, res) => {
  const user_id = req.params.id;
  const { name, email, mobile } = req.body;

  const q = `
    UPDATE users 
    SET name = ?, email = ?, mobile = ?
    WHERE id = ?
  `;

  db.query(q, [name, email, mobile, user_id], (err) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });

    res.json({
      message: "Profile updated",
      name,
      email,
      mobile
    });
  });
};

export const changePassword = (req, res) => {
  const user_id = req.params.id;
  const { old_password, new_password } = req.body;

  // check old password
  db.query("SELECT password FROM users WHERE id = ?", [user_id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (!result.length) return res.status(404).json({ message: "User not found" });

    if (result[0].password !== old_password)
      return res.status(400).json({ message: "Old password incorrect" });

    // update new password
    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [new_password, user_id],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Password changed successfully" });
      }
    );
  });
};


