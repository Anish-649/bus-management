import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageRoutes.css";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    start_point: "",
    end_point: "",
    distance: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Routes
  const loadRoutes = async () => {
    const res = await axios.get("http://localhost:5000/routes");
    setRoutes(res.data);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Route
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      // ADD route
      await axios.post("http://localhost:5000/routes", form);
      alert("Route added!");
    } else {
      // UPDATE route
      await axios.put(`http://localhost:5000/routes/${editingId}`, form);
      alert("Route updated!");
      setEditingId(null);
    }

    // Clear form
    setForm({ start_point: "", end_point: "", distance: "" });
    loadRoutes();
  };

  // Edit Route
  const handleEdit = (route) => {
    setEditingId(route.route_id);
    setForm({
      start_point: route.start_point,
      end_point: route.end_point,
      distance: route.distance
    });
  };

  // Delete Route


  return (
    <div className="routes-container">
      <h2>Manage Routes</h2>

      {/* ADD / EDIT FORM */}
      <form className="route-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="start_point"
          placeholder="Start Point"
          value={form.start_point}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="end_point"
          placeholder="End Point"
          value={form.end_point}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="distance"
          placeholder="Distance (km)"
          value={form.distance}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Route" : "Add Route"}
        </button>
      </form>

      {/* ROUTES TABLE */}
      <table className="routes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Distance (km)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((r) => (
            <tr key={r.route_id}>
              <td>{r.route_id}</td>
              <td>{r.start_point}</td>
              <td>{r.end_point}</td>
              <td>{r.distance}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(r)}>
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
