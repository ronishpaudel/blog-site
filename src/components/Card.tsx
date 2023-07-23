import { useQueryBlog } from "@/hooks/useQueryBlog";
import { useRouter } from "next/router";
import React, { DOMAttributes } from "react";

interface CardProps extends DOMAttributes<HTMLDivElement> {
  image?: string;
  category: string;
  title: string;
  authorName: string;
  profilePic: string;
  createdAt: string;
  onCardClick: () => void;
  onProfileClick: () => void;
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
  category,
  authorName,
  createdAt,
  profilePic,
  title,
  image,
  onCardClick,
  onProfileClick,
  ...rest
}: CardProps) {
  const { data } = useQueryBlog();

  return (
    <>
      {/* {data &&
        data.map((blog) => (
          <div className="m-post-card-grid" onClick={onCardClick}>
            <img src={"/rct.png"} />
            <div className="card-content">
              <div className="card-category">{category}</div>
              <div className="card-title">{blog.title}</div>
              <div className="card-author" onClick={onProfileClick}>
                <img src="author.png" className="author-img" />
                <p className="author-name">{authorName}</p>
                <p>{formatDateToCustomFormat(createdAt)}</p>
              </div>
            </div>
          </div>
        ))} */}
      <div className="m-post-card-grid" onClick={onCardClick}>
        <img src={"/rct.png"} />
        <div className="card-content">
          <div className="card-category">{category}</div>
          <div className="card-title">{title}</div>
          <div className="card-author" onClick={onProfileClick}>
            <img src="author.png" className="author-img" />
            <p className="author-name">{authorName}</p>
            <p>{formatDateToCustomFormat(createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
