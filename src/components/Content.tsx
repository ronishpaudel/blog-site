import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";
import {
  SEARCH_COLOR_PALETTE,
  searchInputStore,
} from "@/store/searchInputStore";
import { TEXT_COLOR_PALETTE, textStore } from "@/store/textColor";
import { useRouter } from "next/router";
import React from "react";
import { useSnapshot } from "valtio";

const Content = () => {
  const { push } = useRouter();
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  const colorSearchPaletteSnap = useSnapshot(searchInputStore);
  const colorTextPaletteSnap = useSnapshot(textStore);

  return (
    <>
      <div
        className="content"
        style={{
          backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
          border: `1px solid ${
            SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor]
          }`,
        }}
        id="content"
        onClick={() => push("/signup")}
      >
        <div className="heading">
          <p className="category">Technology</p>
          <h1
            className="content-title"
            style={{
              color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
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
