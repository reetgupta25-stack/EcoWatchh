import React from "react";
import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="mobile-logo">
          🌱 EcoWatch
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search issues, users..."
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <UserCircle size={36} />

          <div className="profile-info">
            <strong>Shivani</strong>
            <span>Citizen</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;