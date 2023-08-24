import { proxy } from "valtio";

export const FOOTER_COLOR_PALETTE = {
  black: "#141624",
  white: "#fffffff",
};

export type ColorName = keyof typeof FOOTER_COLOR_PALETTE;

interface ColorPalette {
  footerColor: ColorName;
  setFooterColor: (color: ColorName) => void;
}

export const footerPageStore = proxy<ColorPalette>({
  footerColor: "white",
  setFooterColor(color) {
    footerPageStore.footerColor = color;
  },
});
