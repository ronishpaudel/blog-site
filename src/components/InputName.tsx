import React from "react";
interface InputProps {
  style?: React.CSSProperties;
  text: string;
  placeholder: string;
  className?: string;
}
const InputName = ({ style, text, placeholder, className }: InputProps) => {
  return (
    <div style={style} className={`input-box-name ${className}`}>
      <input placeholder={placeholder} required />
      <span>{text}</span>
    </div>
  );
};

export { InputName };
