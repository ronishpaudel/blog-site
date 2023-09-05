import { proxy } from "valtio";

type Itheme = {
  dark: {
    footerBg: string;
    inputBg: string;
    cardBg: string;
    textColor: string;
    dailogBg: string;
    baseColor: string;
    highlightColor: string;
  };
  light: {
    footerBg: string;
    inputBg: string;
    cardBg: string;
    textColor: string;
    dailogBg: string;
    baseColor: string;
    highlightColor: string;
  };
};

export const THEME_PALETTE: Itheme = {
  dark: {
    footerBg: "#141624",
    inputBg: "#242535",
    cardBg: "#181A2A",
    textColor: "#ffffffff",
    dailogBg: "#191b2abf",
    baseColor: "#434343c7",
    highlightColor: "#696a75e3",
  },
  light: {
    footerBg: "#f6f6f7",
    inputBg: "#e8e8ea",
    textColor: "#000000",
    cardBg: "#ffffff",
    dailogBg: "#ffffff8a",
    baseColor: "#d9d9d9",
    highlightColor: "#f5f5f5",
  },
};

export type ThemeName = keyof typeof THEME_PALETTE;

interface ThemePalette {
  theme: ThemeName;
  setTheme: (color: ThemeName) => void;
}

export const themeStore = proxy<ThemePalette>({
  theme: "dark",
  setTheme(color) {
    themeStore.theme = color;
  },
});
