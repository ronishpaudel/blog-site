import React, { FC, forwardRef, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  style?: React.CSSProperties;
  text: string;
  placeholder: string;
  className?: string;
  name: string;
  register: UseFormRegister<any>;
  maxWidth?:
    | "mW210"
    | "mW333"
    | "mW188"
    | "mW440"
    | "mW345"
    | "mW438"
    | "mW115";
  validateObj?: RegisterOptions<any>;
  number?: true | false;
  value?: string;
  onChange?: (e: any) => void;
  height?: HeightType;
}

type HeightType = "hAuto" | "h150";

const InputName: FC<InputProps> = forwardRef(
  (
    {
      style,
      text,
      placeholder,
      name,
      className,
      maxWidth = "mW440",
      register,
      validateObj,
      number,
      value,
      onChange,
      height = "hAuto",
    },
    ref
  ) => {
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
    const typeHeightMap: Record<HeightType, string> = {
      hAuto: "input-box-name hAuto",
      h150: "input-box-name h150",
    };
    return (
      <div
        style={style}
        className={`input-box-name ${typeMaxWidthMap[maxWidth]} ${className} ${typeHeightMap[height]} `}
      >
        <input
          placeholder={placeholder}
          {...register(name, { valueAsNumber: number })}
          value={value}
          onChange={onChange}
        />
        <span>{text}</span>
      </div>
    );
  }
);

export { InputName };
