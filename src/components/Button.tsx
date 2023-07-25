import React from "react";
interface buttonProps {
  style: any;
  onClick: () => void;
  text: string;
}
const Button = ({ style, onClick, text }: buttonProps) => {
  return (
    <button style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
