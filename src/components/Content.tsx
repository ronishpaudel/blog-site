import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { dateFormat } from "@/utils/dateFormat";
import { useRouter } from "next/router";
import React from "react";
import { useSnapshot } from "valtio";

interface ContentProps {
  thumbnailImage?: string;
  category?: string;
  title: string;
  authorName?: string;
  profilePic?: string;
  createdAt: string;
  onCardClick?: () => void;
  user?: string;
}

const Content = ({
  user,
  category,
  authorName,
  createdAt,
  profilePic,
  title,
  thumbnailImage,
  onCardClick,

  ...rest
}: ContentProps) => {
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
          <p className="category">{category}</p>
          <h1
            className="content-title"
            style={{
              color: THEME_PALETTE[themeSnap.theme].textColor,
            }}
          >
            {title}
          </h1>
        </div>
        <div className="author">
          <img src="/rbg.jpg" className="author-img" />
          <p className="ronish">{user}</p>
          <p>{dateFormat(createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export { Content };
