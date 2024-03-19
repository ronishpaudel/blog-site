import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSnapshot } from "valtio";

const MyBlogSkeleton = () => {
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
      >
        <div className="heading mb-4">
          <Skeleton width={100} height={30} />
        </div>
        <Skeleton count={4} />

        <div className="flex gap-5 items-center mt-4">
          <Skeleton circle width={40} height={40} className="author-img" />

          <div style={{ maxWidth: "100px", width: "100%" }}>
            <Skeleton />
          </div>
          <div style={{ maxWidth: "176px", width: "100%" }}>
            <Skeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export { MyBlogSkeleton };
