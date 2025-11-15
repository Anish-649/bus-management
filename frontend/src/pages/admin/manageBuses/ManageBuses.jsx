import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageBuses.css";

export default function ManageBuses() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [form, setForm] = useState({
    bus_number: "",
    bus_type: "",
    capacity: "",
    route_id: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Load routes for dropdown
  const loadRoutes = async () => {
    const res = await axios.get("http://localhost:5000/routes");
    setRoutes(res.data);
  };

  // Load buses
  const loadBuses = async () => {
    const res = await axios.get("http://localhost:5000/buses");
    setBuses(res.data);
  };

  useEffect(() => {
    loadRoutes();
    loadBuses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Bus
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      await axios.post("http://localhost:5000/buses", form);
      alert("Bus added!");
    } else {
      await axios.put(`http://localhost:5000/buses/${editingId}`, form);
      alert("Bus updated!");
      setEditingId(null);
    }

    setForm({ bus_number: "", bus_type: "", capacity: "", route_id: "" });
    loadBuses();
  };

  const handleEdit = (bus) => {
    setEditingId(bus.bus_id);
    setForm({
      bus_number: bus.bus_number,
      bus_type: bus.bus_type,
      capacity: bus.capacity,
      route_id: bus.route_id
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`http://localhost:5000/buses/${id}`);
    alert("Bus deleted!");
    loadBuses();
  };

  return (
    <div className="bus-container">
      <h2>Manage Buses</h2>

      {/* FORM */}
      <form className="bus-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="bus_number"
          placeholder="Bus Number"
          value={form.bus_number}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="bus_type"
          placeholder="Bus Type (AC, Non-AC)"
          value={form.bus_type}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          required
        />

        <select
          name="route_id"
          value={form.route_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Route</option>
          {routes.map((r) => (
            <option key={r.route_id} value={r.route_id}>
              {r.start_point} → {r.end_point}
            </option>
          ))}
        </select>

        <button type="submit">{editingId ? "Update Bus" : "Add Bus"}</button>
      </form>

      {/* TABLE */}
      <table className="bus-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus No</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Route</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((b) => (
            <tr key={b.bus_id}>
              <td>{b.bus_id}</td>
              <td>{b.bus_number}</td>
              <td>{b.bus_type}</td>
              <td>{b.capacity}</td>
              <td>{b.start_point} → {b.end_point}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(b)}>
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
