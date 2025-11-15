import { db } from "../config/db.js";

// GET all customers
export const getCustomers = (req, res) => {
  db.query("SELECT id, name, email, mobile FROM users", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// UPDATE CUSTOMER
export const updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, email, mobile } = req.body;

  const q = `
    UPDATE users SET name=?, email=?, mobile=?
    WHERE id=?
  `;

  db.query(q, [name, email, mobile, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer updated successfully" });
  });
};

// DELETE CUSTOMER
export const deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer deleted successfully" });
  });
};
