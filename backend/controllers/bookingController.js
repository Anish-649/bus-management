import { db } from "../config/db.js";

export const bookSeat = (req, res) => {
     console.log("📩 Booking Request:", req.body);  
  const { user_id, schedule_id, seat_no } = req.body;

  db.query(
    "INSERT INTO booking (schedule_id, passenger_id, seat_no) VALUES (?, ?, ?)",
    [schedule_id, user_id, seat_no],
    () => res.json({ message: "Seat booked successfully" })
  );
};

export const getBookingHistory = (req, res) => {
  const user_id = req.params.user_id;

  const q = `
    SELECT 
      booking.booking_id,
      booking.seat_no,
      booking.status,
      booking.booking_date,
      schedule.price,
      route.start_point,
      route.end_point
    FROM booking
    JOIN schedule ON booking.schedule_id = schedule.schedule_id
    JOIN bus ON schedule.bus_id = bus.bus_id
    JOIN route ON bus.route_id = route.route_id
    WHERE booking.passenger_id = ?
    ORDER BY booking.booking_date DESC
  `;

  db.query(q, [user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ history: result });
  });
};



