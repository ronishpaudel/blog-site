import React from "react";
interface buttonProps {
  onClick?: () => void;
  text: string;
  className?: React.CSSProperties;
  style?: React.CSSProperties;
}
const Button = ({ className, onClick, text, style }: buttonProps) => {
  return (
    <button style={style} onClick={onClick} className={`auth-btn ${className}`}>
      {text}
    </button>
  );
};

export default Button;
