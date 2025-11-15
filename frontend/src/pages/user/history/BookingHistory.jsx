import React, { useEffect, useState } from "react";
import "./bookingHistory.css";
import axios from "axios";

export default function BookingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const res = await axios.get(`http://localhost:5000/booking/history/${user_id}`);
      setHistory(res.data.history || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load booking history");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Booking History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Date</th>
              <th>Price</th>
              <th>Seat</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((h) => (
              <tr key={h.booking_id}>
                <td>{h.start_point} → {h.end_point}</td>
                <td>{new Date(h.booking_date).toLocaleDateString("en-IN")}</td>
                <td>₹{h.price}</td>
                <td>{h.seat_no}</td>
                <td>{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
