import React, { DOMAttributes } from "react";

import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

interface CardProps extends DOMAttributes<HTMLDivElement> {
  thumbnailImage?: string;
  category?: string;
  title: string;
  authorName?: string;
  profilePic?: string;
  createdAt: string;
  onCardClick: () => void;
  onProfileClick: () => void;
  user?: string;
}

function formatDateToCustomFormat(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}

function Card({
  user,
  category,
  authorName,
  createdAt,
  profilePic,
  title,
  thumbnailImage,
  onCardClick,
  onProfileClick,
  ...rest
}: CardProps) {
  const themeSnap = useSnapshot(themeStore);

  return (
    <>
      <div
        className="m-post-card-grid"
        onClick={onCardClick}
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
        }}
      >
        <img
          src={thumbnailImage}
          style={{
            border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
          }}
        />
        <div className="card-content">
          <div className="card-category">{category}</div>
          <div
            className="card-title"
            style={{
              color: THEME_PALETTE[themeSnap.theme].textColor,
            }}
          >
            {title}
          </div>
          <div className="card-author" onClick={onProfileClick}>
            <img src="/rbg.jpg" />
            <div style={{ display: "flex", gap: "30px" }}>
              <p> {user}</p>
              <p> {createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
