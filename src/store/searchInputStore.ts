import { proxy } from "valtio";

export const SEARCH_COLOR_PALETTE = {
  black: "#52525B",
  white: "#fffffff",
};

export type SearchColorName = keyof typeof SEARCH_COLOR_PALETTE;

interface ColorPalette {
  SearchColor: SearchColorName;
  setSearchColor: (color: SearchColorName) => void;
}

export const searchInputStore = proxy<ColorPalette>({
  SearchColor: "white",
  setSearchColor(color) {
    searchInputStore.SearchColor = color;
  },
});
