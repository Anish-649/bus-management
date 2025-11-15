import { db } from "../config/db.js";

export const getDashboardStats = (req, res) => {
  const stats = {};

  const queries = [
    { key: "routes", sql: "SELECT COUNT(*) AS total FROM route" },
    { key: "buses", sql: "SELECT COUNT(*) AS total FROM bus" },
    { key: "schedules", sql: "SELECT COUNT(*) AS total FROM schedule" },
    { key: "customers", sql: "SELECT COUNT(*) AS total FROM users" },
    { key: "bookings", sql: "SELECT COUNT(*) AS total FROM booking" },
    { key: "todayBookings", sql: "SELECT COUNT(*) AS total FROM booking WHERE DATE(booking_date)=CURDATE()" }
  ];

  let completed = 0;

  queries.forEach(({ key, sql }) => {
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json(err);

      stats[key] = result[0].total;
      completed++;

      if (completed === queries.length) {
        res.json(stats);
      }
    });
  });
};
