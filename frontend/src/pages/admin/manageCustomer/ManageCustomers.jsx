import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageCustomers.css";

export default function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: ""
  });

  const loadCustomers = async () => {
    const res = await axios.get("http://localhost:5000/customers");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      email: c.email,
      mobile: c.mobile
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/customers/${editingId}`, form);
    alert("Customer updated!");
    setEditingId(null);
    setForm({ name: "", email: "", mobile: "" });
    loadCustomers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await axios.delete(`http://localhost:5000/customers/${id}`);
    alert("Customer deleted!");
    loadCustomers();
  };

  return (
    <div className="customer-container">
      <h2>Manage Customers</h2>

      {/* EDIT FORM */}
      {editingId && (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
      )}

      {/* TABLE */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(c)}>
                  Edit
                </button>

               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

