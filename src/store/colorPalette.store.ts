import { proxy } from "valtio";

export const COLOR_PALETTE = {
  black: "#181A2A",
  white: "#fffffff",
};

export type ColorName = keyof typeof COLOR_PALETTE;

interface ColorPalette {
  color: ColorName;
  setColor: (color: ColorName) => void;
}

export const colorPaletteStore = proxy<ColorPalette>({
  color: "white",

  setColor(color) {
    colorPaletteStore.color = color;
  },
});
