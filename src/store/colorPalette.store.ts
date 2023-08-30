import { proxy } from "valtio";

type Itheme = {
  dark: {
    footerBg: string;
    inputBg: string;
    cardBg: string;
    textColor: string;
    dailogBg: string;
  };
  light: {
    footerBg: string;
    inputBg: string;
    cardBg: string;
    textColor: string;
    dailogBg: string;
  };
};

export const THEME_PALETTE: Itheme = {
  dark: {
    footerBg: "#141624",
    inputBg: "#242535",
    cardBg: "#181A2A",
    textColor: "#ffffffff",
    dailogBg: "#191b2abf",
  },
  light: {
    footerBg: "#f6f6f7",
    inputBg: "#e8e8ea",
    textColor: "#141624",
    cardBg: "#ffffff",
    dailogBg: "#ffffff8a",
  },
};

export type ThemeName = keyof typeof THEME_PALETTE;

interface ThemePalette {
  theme: ThemeName;
  setTheme: (color: ThemeName) => void;
}

export const themeStore = proxy<ThemePalette>({
  theme: "light",
  setTheme(color) {
    themeStore.theme = color;
  },
});
