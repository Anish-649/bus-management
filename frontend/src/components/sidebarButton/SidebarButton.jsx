import React from "react";
import "./sidebarButton.css";

export default function SidebarButton({ label, icon, active, onClick }) {
  return (
    <button
      className={`sidebar-btn ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-label">{label}</span>
    </button>
  );
}
