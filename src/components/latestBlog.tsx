import React from "react";
import parse from "html-react-parser";

interface ILatestBlog {
  image: string;
  title: string;
  description: string;
  onCardClick: () => void;
}
const LatestBlog = ({
  image,
  title,
  description,
  onCardClick,
}: ILatestBlog) => {
  return (
    <div
      className="border-t border-inherit text-white flex items-center gap-4 mt-4 w-[100%] cursor-pointer"
      onClick={onCardClick}
    >
      <img
        src={image}
        alt="latest"
        className="w-[50px] h-[50px] object-cover rounded-md mt-1"
      />
      <div className="flex flex-col">
        <div className="text-lg font-bold line-clamp-1">{title}</div>
        <div className=" line-clamp-1">{parse(String(description))}</div>
      </div>
    </div>
  );
};

export { LatestBlog };
