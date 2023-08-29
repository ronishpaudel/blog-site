import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import React, { FC, forwardRef, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { useSnapshot } from "valtio";

interface InputProps {
  style?: React.CSSProperties;
  text?: string;
  placeholder?: string;
  className?: string;
  name: string;
  type?: string;
  register?: UseFormRegister<any>;
  maxWidth?:
    | "mW700"
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

const TextInput: FC<InputProps> = forwardRef(
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
      type,
      onChange,
      height = "hAuto",
    },
    ref
  ) => {
    const typeMaxWidthMap: Record<
      | "mW210"
      | "mW333"
      | "mW188"
      | "mW440"
      | "mW345"
      | "mW438"
      | "mW115"
      | "mW700",
      string
    > = {
      mW188: "input-box-name mW188",
      mW210: "input-box-name mW210",
      mW333: "input-box-name mW333",
      mW345: "input-box-name mW345",
      mW438: "input-box-name mW438",
      mW440: "input-box-name mW440",
      mW115: "input-box-name mW115",
      mW700: "input-box-name mW700",
    };
    const typeHeightMap: Record<HeightType, string> = {
      hAuto: "input-box-name hAuto",
      h150: "input-box-name h150",
    };
    const themeSnap = useSnapshot(themeStore);

    return (
      <div
        style={style}
        className={`input-box-name ${typeMaxWidthMap[maxWidth]} ${className} ${typeHeightMap[height]} `}
      >
        {register ? (
          <input
            placeholder={placeholder}
            {...register(name, { valueAsNumber: number })}
            value={value}
            onChange={onChange}
            type={type}
            style={{
              backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
              color: THEME_PALETTE[themeSnap.theme].textColor,
            }}
          />
        ) : (
          <input
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            style={{
              backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
              color: THEME_PALETTE[themeSnap.theme].textColor,
            }}
          />
        )}
        <span
          className="textInput-text"
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
            color: THEME_PALETTE[themeSnap.theme].textColor,
          }}
        >
          {text}
        </span>
      </div>
    );
  }
);

export { TextInput };
