import React from "react";
import { Logo } from "../../public";

interface ILogo {
  style?: React.CSSProperties;
  onClick?: () => void;
}

const AuthHeaderlogo = ({ style, onClick }: ILogo) => {
  return (
    <div style={style} onClick={onClick} className="auth-header-logo">
      <Logo />
    </div>
  );
};

export default AuthHeaderlogo;
