import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSnapshot } from "valtio";

const MyBlogSkeleton = () => {
  const themeSnap = useSnapshot(themeStore);

  return (
    <div className="flex flex-col gap-10">
      <div
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
        }}
      >
        <div className="flex gap-5 items-center mt-4">
          <Skeleton width={200} height={160} className="author-img" />

          <div
            style={{ maxWidth: "1900px", width: "100%" }}
            className="flex flex-col"
          >
            <Skeleton count={7} />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
        }}
      >
        <div className="flex gap-5 items-center mt-4">
          <Skeleton width={200} height={160} className="author-img" />

          <div
            style={{ maxWidth: "1900px", width: "100%" }}
            className="flex flex-col"
          >
            <Skeleton count={7} />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
        }}
      >
        <div className="flex gap-5 items-center mt-4">
          <Skeleton width={200} height={160} className="author-img" />

          <div
            style={{ maxWidth: "1900px", width: "100%" }}
            className="flex flex-col"
          >
            <Skeleton count={7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyBlogSkeleton };
