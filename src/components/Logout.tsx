import React from "react";

interface Ilogout {
  onLogout: () => void;
  onCancel: () => void;
}
const Logout = ({ onLogout, onCancel }: Ilogout) => {
  return (
    <div className="logout-container">
      <p>Do you want to logout?</p>
      <div className="logout-btn">
        <button className="agree-btn" onClick={onLogout}>
          Yes
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
