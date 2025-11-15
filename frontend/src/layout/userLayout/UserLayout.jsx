import React, { useState, useEffect } from "react";
import SidebarButton from "../../components/sidebarButton/SidebarButton";
import "./userLayout.css";
import { useNavigate } from "react-router-dom";

import {
  RiHome4Line,
  RiBusLine,
  RiMapPinLine,
  RiHistoryLine,
  RiUser3Line,
  RiLogoutBoxLine,
} from "react-icons/ri";

import Dashboard from "../../pages/user/dashboard/Dashboard";
import BookBus from "../../pages/user/bookBus/BookBus";
import RouteList from "../../pages/user/routes/RouteList";
import BookingHistory from "../../pages/user/history/BookingHistory";
import Profile from "../../pages/user/profile/profile";

export default function UserLayout() {
  const [active, setActive] = useState("book-bus");

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) {
        navigate("/login");
        return;
      }

      const name = localStorage.getItem("name") || "Customer";
      const email = localStorage.getItem("email") || "email@example.com";

      setUser({ name, email });
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bm-userLayout">

      {/* LEFT SIDEBAR */}
      <div className="bm-left">
        <div className="bm-user-profile">
          <div className="bm-avatar">{user.name.charAt(0)}</div>
          <div>
            <h4>{user.name}</h4>
            <h5>{user.email}</h5>
          </div>
        </div>

        <div className="bm-menu">
          

          <SidebarButton
            label="Book a Bus"
            icon={<RiBusLine size={20} />}
            active={active === "book-bus"}
            onClick={() => setActive("book-bus")}
          />

          <SidebarButton
            label="Routes"
            icon={<RiMapPinLine size={20} />}
            active={active === "routes"}
            onClick={() => setActive("routes")}
          />

          <SidebarButton
            label="Booking History"
            icon={<RiHistoryLine size={20} />}
            active={active === "history"}
            onClick={() => setActive("history")}
          />

          <SidebarButton
            label="Profile"
            icon={<RiUser3Line size={20} />}
            active={active === "profile"}
            onClick={() => setActive("profile")}
          />
        </div>

        <div className="bm-logout">
          <button onClick={handleLogout}>
            <RiLogoutBoxLine size={18} /> Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="bm-right">
       
        {active === "book-bus" && <BookBus />}
        {active === "routes" && <RouteList />}
        {active === "history" && <BookingHistory />}
        {active === "profile" && <Profile />}
      </div>

    </div>
  );
}
