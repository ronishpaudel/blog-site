import { proxy } from "valtio";

export const TEXT_COLOR_PALETTE = {
  black: "#0000000",
  white: "#FFFFFF",
};

export type SearchColorName = keyof typeof TEXT_COLOR_PALETTE;

interface ColorPalette {
  textColor: SearchColorName;
  setTextColor: (color: SearchColorName) => void;
}

export const textStore = proxy<ColorPalette>({
  textColor: "black",
  setTextColor(color) {
    textStore.textColor = color;
  },
});
