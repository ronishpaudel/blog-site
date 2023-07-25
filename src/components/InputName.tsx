import React from "react";
interface InputProps {
  style?: any;
  text: string;
  placeholder: string;
}
const InputName = ({ style, text, placeholder }: InputProps) => {
  return (
    <div style={style} className="input-box-name">
      <input placeholder={placeholder} required />
      <span>{text}</span>
    </div>
  );
};

export { InputName };
