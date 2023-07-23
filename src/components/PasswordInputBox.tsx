import React from "react";

const PasswordInputBox = () => {
  return (
    <div className="input-box">
      <input type="password" placeholder="Password*" required />
      <span>Password</span>
    </div>
  );
};

export default PasswordInputBox;
