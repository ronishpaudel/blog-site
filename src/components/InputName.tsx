import React from "react";
interface InputProps {
  style?: React.CSSProperties;
  text: string;
  placeholder: string;
  className?: string;
  maxWidth?:
    | "mW210"
    | "mW333"
    | "mW188"
    | "mW440"
    | "mW345"
    | "mW438"
    | "mW115";
}
const InputName = ({
  style,
  text,
  placeholder,
  className,
  maxWidth = "mW440",
}: InputProps) => {
  const typeMaxWidthMap: Record<
    "mW210" | "mW333" | "mW188" | "mW440" | "mW345" | "mW438" | "mW115",
    string
  > = {
    mW188: "input-box-name mW188",
    mW210: "input-box-name mW210",
    mW333: "input-box-name mW333",
    mW345: "input-box-name mW345",
    mW438: "input-box-name mW438",
    mW440: "input-box-name mW440",
    mW115: "input-box-name mW115",
  };
  return (
    <div
      style={style}
      className={`input-box-name ${typeMaxWidthMap[maxWidth]} ${className}`}
    >
      <input placeholder={placeholder} required />
      <span>{text}</span>
    </div>
  );
};

export { InputName };
