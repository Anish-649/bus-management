import { db } from "../config/db.js";



export const searchBuses = (req, res) => {
  const { from, to } = req.body;

  const sql = `
    SELECT 
      schedule.schedule_id,
      schedule.departure_time,
      schedule.arrival_time,
      schedule.price,
      bus.bus_id,
      bus.bus_number,
      bus.bus_type,
      bus.capacity,
      route.start_point,
      route.end_point
    FROM schedule
    JOIN bus ON schedule.bus_id = bus.bus_id
    JOIN route ON bus.route_id = route.route_id
    WHERE route.start_point = ? AND route.end_point = ?
  `;

  db.query(sql, [from, to], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ buses: [] });
    }

    res.json({ buses: result });
  });
};



// GET ALL SCHEDULES
export const getSchedules = (req, res) => {
  const q = `
    SELECT schedule.*, 
           bus.bus_number, 
           bus.bus_type, 
           route.start_point, 
           route.end_point 
    FROM schedule
    JOIN bus ON schedule.bus_id = bus.bus_id
    JOIN route ON schedule.route_id = route.route_id
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// ADD SCHEDULE
export const addSchedule = (req, res) => {
  const { bus_id, route_id, departure_time, arrival_time, price } = req.body;

  const q = `
    INSERT INTO schedule (bus_id, route_id, departure_time, arrival_time, price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(q, [bus_id, route_id, departure_time, arrival_time, price], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Schedule added successfully" });
  });
};

// UPDATE SCHEDULE
export const updateSchedule = (req, res) => {
  const { id } = req.params;
  const { bus_id, route_id, departure_time, arrival_time, price } = req.body;

  const q = `
    UPDATE schedule SET bus_id=?, route_id=?, departure_time=?, arrival_time=?, price=?
    WHERE schedule_id=?
  `;

  db.query(q, [bus_id, route_id, departure_time, arrival_time, price, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Schedule updated successfully" });
  });
};

// DELETE SCHEDULE
export const deleteSchedule = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM schedule WHERE schedule_id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Schedule deleted successfully" });
  });
};
