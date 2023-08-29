import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useRouter } from "next/router";
import React from "react";
import { useSnapshot } from "valtio";

const Content = () => {
  const { push } = useRouter();
  const themeSnap = useSnapshot(themeStore);

  return (
    <>
      <div
        className="content"
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
        }}
        id="content"
        onClick={() => push("/signup")}
      >
        <div className="heading">
          <p className="category">Technology</p>
          <h1
            className="content-title"
            style={{
              color: THEME_PALETTE[themeSnap.theme].textColor,
            }}
          >
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
        </div>
        <div className="author">
          <img src="/rbg.jpg" className="author-img" />
          <p className="ronish">Ronish Paudel</p>
          <p>August 20,2023</p>
        </div>
      </div>
    </>
  );
};

export { Content };
