import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css"; // Create separately for styling if needed

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin"); // goes to login
  };

  return (
    <div className="admin-home-container">
      <header className="admin-header">
        <h1>CityVoice Admin Portal</h1>
        <p className="admin-subtitle">
          Manage, track and resolve civic issues raised by citizens.
        </p>
        <button className="admin-login-btn" onClick={handleLogin}>
          Admin Login
        </button>
      </header>
    </div>
  );
};

export default AdminHome;
