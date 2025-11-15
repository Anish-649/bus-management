import React, { useEffect, useState } from "react";
import "./routeList.css";
import axios from "axios";

export default function RouteList() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/routes");
      setRoutes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to load routes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div className="route-container">
      <h2>Available Routes</h2>

      {loading ? (
        <p>Loading routes...</p>
      ) : (
        <div className="route-list">
          {routes.map((r) => (
            <div key={r.route_id} className="route-card">
              <h3>{r.start_point} → {r.end_point}</h3>
              <p>Distance: {r.distance} km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
