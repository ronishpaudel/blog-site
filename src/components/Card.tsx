import React, { DOMAttributes } from "react";
import { Author } from "./Author";
import { Tag } from "./Tag";
import { useSnapshot } from "valtio";
import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";
import {
  SEARCH_COLOR_PALETTE,
  searchInputStore,
} from "@/store/searchInputStore";
import { TEXT_COLOR_PALETTE, textStore } from "@/store/textColor";

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
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  const colorSearchPaletteSnap = useSnapshot(searchInputStore);
  const colorTextPaletteSnap = useSnapshot(textStore);

  return (
    <>
      <div
        className="m-post-card-grid"
        onClick={onCardClick}
        style={{
          backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
          border: `1px solid ${
            SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor]
          }`,
        }}
      >
        <img src={thumbnailImage} />
        <div className="card-content">
          <div className="card-category">{category}</div>
          <div
            className="card-title"
            style={{
              color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
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
