import React, { useState } from "react";
import "./BookBus.css";
import axios from "axios";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};

export default function BookBus() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);

  // seat modal states
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // confirmation popup
  const [confirmData, setConfirmData] = useState(null);

  const searchBuses = async () => {
    if (!from || !to || !date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/schedule/search", {
        from,
        to,
        date,
      });

      setBuses(res.data.buses);
    } catch (error) {
      console.error(error);
      alert("Error fetching buses");
    }
  };

  /** OPEN SEAT SELECTION MODAL **/
  const openSeatModal = (bus) => {
    setSelectedSchedule(bus.schedule_id);
    setShowSeatModal(true);
  };

  /** CONFIRM BOOKING **/
  const confirmBooking = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const res = await axios.post("http://localhost:5000/booking/book", {
        user_id,
        schedule_id: selectedSchedule,
        seat_no: selectedSeat,
      });

      setShowSeatModal(false);

      // Show confirmation popup
      setConfirmData({
        seat: selectedSeat,
        schedule_id: selectedSchedule,
        bus_number: buses.find((b) => b.schedule_id === selectedSchedule)?.bus_number
      });

    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="book-container">
      <h2>Book a Bus</h2>

      <div className="search-box">
        <input type="text" placeholder="From" onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To" onChange={(e) => setTo(e.target.value)} />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button onClick={searchBuses}>Search</button>
      </div>

      <div className="bus-list">
        {buses.length === 0 ? (
          <p>No buses found.</p>
        ) : (
          buses.map((bus) => (
            <div className="bus-card" key={bus.schedule_id}>
              <div>
                <h3>{bus.bus_number} - {bus.bus_type}</h3>
                <p>{bus.start_point} → {bus.end_point}</p>
                <p>Departure: {formatDateTime(bus.departure_time)}</p>
                <p>Arrival: {formatDateTime(bus.arrival_time)}</p>
                <p>Price: ₹{bus.price}</p>
              </div>

              <button
                className="bus-book-btn"
                onClick={() => openSeatModal(bus)}
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>


      {/* ⭐ Seat Selection Modal */}
      {showSeatModal && (
        <div className="seat-modal">
          <div className="seat-modal-content">
            <h3>Select a Seat</h3>

            <div className="seat-grid">
              {[...Array(20)].map((_, index) => {
                const seat = index + 1;
                return (
                  <div
                    key={seat}
                    className={`seat-box ${selectedSeat === seat ? "selected-seat" : ""}`}
                    onClick={() => setSelectedSeat(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>

            <button
              className="confirm-btn"
              disabled={!selectedSeat}
              onClick={confirmBooking}
            >
              Confirm Booking
            </button>

            <button className="close-btn" onClick={() => setShowSeatModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ⭐ Confirmation Popup */}
      {confirmData && (
        <div className="confirm-popup">
          <div className="confirm-content">
            <h3>🎉 Booking Confirmed!</h3>
            <p><b>Bus:</b> {confirmData.bus_number}</p>
            <p><b>Seat No:</b> {confirmData.seat}</p>

            <button onClick={() => setConfirmData(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
