import React from "react";

const CompanyName = () => {
  return (
    <div className="input-box-name">
      <input
        style={{ width: "438px", padding: "15px 12px" }}
        placeholder="Company name"
        required
      />
      <span>Company name</span>
    </div>
  );
};

export { CompanyName };
