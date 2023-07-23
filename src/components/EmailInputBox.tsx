import React from "react";

const EmailInputBox = () => {
  return (
    <div className="input-box">
      <input type="email" placeholder="Email Address*" required />
      <span>Email Address</span>
    </div>
  );
};

export default EmailInputBox;
