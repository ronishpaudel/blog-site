import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import React from "react";
import { useSnapshot } from "valtio";

const Ad = () => {
  const themeSnap = useSnapshot(themeStore);
  return (
    <>
      <div
        style={{ backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg }}
        className="AD"
      >
        <div
          className="ADs"
          style={{
            color: THEME_PALETTE[themeSnap.theme].textColor,
          }}
        >
          You can place ads
        </div>
      </div>
    </>
  );
};

export default Ad;
