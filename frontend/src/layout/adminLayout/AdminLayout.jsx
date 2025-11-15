import React, { useEffect, useState } from "react";
import SidebarButton from "../../components/sidebarButton/SidebarButton";
import ManageRoutes from "../../pages/admin/routes/ManageRoutes";
import { useNavigate } from "react-router-dom";

import {
  RiHome4Line,
  RiBusLine,
  RiMapPinLine,
  RiCalendar2Line,
  RiGroupLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

import "./adminLayout.css"; // create CSS later
import ManageBuses from "../../pages/admin/manageBuses/ManageBuses";
import ManageSchedule from "../../pages/admin/manageSchedule/ManageSchedule";
import ManageCustomers from "../../pages/admin/manageCustomer/ManageCustomers";
import Dashboard from "../../pages/user/dashboard/Dashboard";

export default function AdminLayout() {
  const [active, setActive] = useState("dashboard");
  const [admin, setAdmin] = useState({
    username: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const admin_id = localStorage.getItem("admin_id");
    const username = localStorage.getItem("admin_username");

    if (!admin_id) {
      navigate("/login");
      return;
    }

    setAdmin({ username });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_id");
    localStorage.removeItem("admin_username");
    navigate("/login");
  };

  return (
    <div className="adminLayout">

      {/* LEFT SIDEBAR */}
      <div className="admin-left">
        
        {/* Admin Profile */}
        <div className="admin-profile">
          <div className="admin-avatar">{admin.username.charAt(0).toUpperCase()}</div>
          <div>
            <h4>{admin.username}</h4>
            <h5>Administrator</h5>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="admin-menu">
          <SidebarButton
            label="Dashboard"
            icon={<RiHome4Line size={20} />}
            active={active === "dashboard"}
            onClick={() => setActive("dashboard")}
          />

          <SidebarButton
            label="Manage Routes"
            icon={<RiMapPinLine size={20} />}
            active={active === "routes"}
            onClick={() => setActive("routes")}
          />

          <SidebarButton
            label="Manage Buses"
            icon={<RiBusLine size={20} />}
            active={active === "buses"}
            onClick={() => setActive("buses")}
          />

          <SidebarButton
            label="Schedules"
            icon={<RiCalendar2Line size={20} />}
            active={active === "schedules"}
            onClick={() => setActive("schedules")}
          />

          <SidebarButton
            label="Customers"
            icon={<RiGroupLine size={20} />}
            active={active === "customers"}
            onClick={() => setActive("customers")}
          />
        </div>

        {/* Logout */}
        <div className="admin-logout">
          <button onClick={handleLogout}>
            <RiLogoutBoxLine size={18} /> Logout
          </button>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="admin-right">
        {/* Later you will plug in real components here */}
        {active === "dashboard" && <Dashboard/>}
        {active === "routes" && <ManageRoutes/>}
        {active === "buses" && <ManageBuses/>}
        {active === "schedules" && <ManageSchedule/>}
        {active === "customers" && <ManageCustomers/>}
      </div>

    </div>
  );
}
