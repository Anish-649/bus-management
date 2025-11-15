import { db } from "../config/db.js";



// GET ALL ROUTES
export const getRoutes = (req, res) => {
  db.query("SELECT * FROM route", (err, routes) => {
    if (err) return res.status(500).json(err);
    res.json(routes);
  });
};

// ADD ROUTE
export const addRoute = (req, res) => {
  const { start_point, end_point, distance } = req.body;

  const q = `
    INSERT INTO route (start_point, end_point, distance)
    VALUES (?, ?,?)
  `;

  db.query(q, [start_point, end_point, distance], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Route added successfully" });
  });
};

// UPDATE ROUTE
export const updateRoute = (req, res) => {
  const route_id = req.params.id;
  const { start_point, end_point, distance } = req.body;

  const q = `
    UPDATE route 
    SET start_point = ?, end_point = ?, distance = ?
    WHERE route_id = ?
  `;

  db.query(q, [start_point, end_point, distance, route_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Route updated successfully" });
  });
};

// DELETE ROUTE
export const deleteRoute = (req, res) => {
  const route_id = req.params.id;

  const q = "DELETE FROM route WHERE route_id = ?";

  db.query(q, [route_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete error", err });

    return res.json({ message: "Route deleted successfully" });
  });
};


