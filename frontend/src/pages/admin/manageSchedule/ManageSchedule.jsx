import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageSchedule.css";

export default function ManageSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);

  const [form, setForm] = useState({
    bus_id: "",
    route_id: "",
    departure_time: "",
    arrival_time: "",
    price: ""
  });

  const [editingId, setEditingId] = useState(null);

  const loadRoutes = async () => {
    const res = await axios.get("http://localhost:5000/routes");
    setRoutes(res.data);
  };

  const loadBuses = async () => {
    const res = await axios.get("http://localhost:5000/buses");
    setBuses(res.data);
  };

  const loadSchedules = async () => {
    const res = await axios.get("http://localhost:5000/schedules");
    setSchedules(res.data);
  };

  useEffect(() => {
    loadRoutes();
    loadBuses();
    loadSchedules();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId) {
      await axios.post("http://localhost:5000/schedules", form);
      alert("Schedule added!");
    } else {
      await axios.put(`http://localhost:5000/schedules/${editingId}`, form);
      alert("Schedule updated!");
      setEditingId(null);
    }

    setForm({ bus_id: "", route_id: "", departure_time: "", arrival_time: "", price: "" });
    loadSchedules();
  };

  const handleEdit = (s) => {
    setEditingId(s.schedule_id);
    setForm({
      bus_id: s.bus_id,
      route_id: s.route_id,
      departure_time: s.departure_time.slice(0, 16),
      arrival_time: s.arrival_time.slice(0, 16),
      price: s.price
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;
    await axios.delete(`http://localhost:5000/schedules/${id}`);
    alert("Deleted!");
    loadSchedules();
  };

  return (
    <div className="schedule-container">
      <h2>Manage Schedule</h2>

      {/* FORM */}
      <form className="schedule-form" onSubmit={handleSubmit}>
        
        <select name="bus_id" value={form.bus_id} onChange={handleChange} required>
          <option value="">Select Bus</option>
          {buses.map((b) => (
            <option key={b.bus_id} value={b.bus_id}>
              {b.bus_number} - {b.bus_type}
            </option>
          ))}
        </select>

        <select name="route_id" value={form.route_id} onChange={handleChange} required>
          <option value="">Select Route</option>
          {routes.map((r) => (
            <option key={r.route_id} value={r.route_id}>
              {r.start_point} → {r.end_point}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="departure_time"
          value={form.departure_time}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="arrival_time"
          value={form.arrival_time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Schedule" : "Add Schedule"}
        </button>
      </form>

      {/* TABLE */}
      <table className="schedule-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((s) => (
            <tr key={s.schedule_id}>
              <td>{s.schedule_id}</td>
              <td>{s.bus_number}</td>
              <td>{s.start_point} → {s.end_point}</td>
              <td>{new Date(s.departure_time).toLocaleString()}</td>
              <td>{new Date(s.arrival_time).toLocaleString()}</td>
              <td>₹{s.price}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(s)}>
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
