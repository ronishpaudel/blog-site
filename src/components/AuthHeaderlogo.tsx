import React from "react";
import { Logo } from "../../public";

const AuthHeaderlogo = ({ style }: any) => {
  return (
    <div style={style} className="auth-header-logo">
      <Logo />
    </div>
  );
};

export default AuthHeaderlogo;
