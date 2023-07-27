import React from "react";
interface buttonProps {
  onClick?: () => void;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  preset?: "primary" | "secondary";
  maxWidth?:
    | "mW210"
    | "mW333"
    | "mW188"
    | "mW440"
    | "mW345"
    | "mW438"
    | "mW115"
    | "mW145";
}
const Button = ({
  className,
  onClick,
  text,
  style,
  maxWidth = "mW210",
  preset = "primary",
}: buttonProps) => {
  const typeClassNameMap: Record<"primary" | "secondary", string> = {
    primary: "btn pri-btn",
    secondary: "btn sec-btn",
  } as const;
  const typeMaxWidthMap: Record<
    | "mW210"
    | "mW333"
    | "mW188"
    | "mW440"
    | "mW345"
    | "mW438"
    | "mW115"
    | "mW145",
    string
  > = {
    mW188: "btn mW188",
    mW210: "btn mW210",
    mW333: "btn mW333",
    mW345: "btn mW345",
    mW438: "btn mW438",
    mW440: "btn mW440",
    mW115: "btn mW115",
    mW145: "btn mW145",
  };
  return (
    <button
      style={style}
      onClick={onClick}
      className={`btn ${typeClassNameMap[preset]} ${typeMaxWidthMap[maxWidth]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
