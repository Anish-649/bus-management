import { db } from "../config/db.js";

// GET ALL BUSES
export const getBuses = (req, res) => {
  const q = `
    SELECT bus.*, route.start_point, route.end_point 
    FROM bus 
    LEFT JOIN route ON bus.route_id = route.route_id
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// ADD BUS
export const addBus = (req, res) => {
  const { bus_number, bus_type, capacity, route_id } = req.body;

  const q = `
    INSERT INTO bus (bus_number, bus_type, capacity, route_id) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(q, [bus_number, bus_type, capacity, route_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Bus added successfully" });
  });
};

// UPDATE BUS
export const updateBus = (req, res) => {
  const { id } = req.params;
  const { bus_number, bus_type, capacity, route_id } = req.body;

  const q = `
    UPDATE bus SET bus_number = ?, bus_type = ?, capacity = ?, route_id = ?
    WHERE bus_id = ?
  `;

  db.query(q, [bus_number, bus_type, capacity, route_id, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Bus updated successfully" });
  });
};

// DELETE BUS
export const deleteBus = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM bus WHERE bus_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Bus deleted successfully" });
  });
};
