import React from "react";

interface footerProps {
  style?: React.CSSProperties;
}
const AuthFooter = ({ style }: footerProps) => {
  return (
    <div style={style} className="signup-footer">
      <div>Terms and conditions</div>
      <p className="dot"></p>
      <span>Privacy policy</span>
    </div>
  );
};

export default AuthFooter;
