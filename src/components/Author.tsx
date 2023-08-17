import { useAuthorInfo } from "@/hooks/useAuthorInfo";
import { useOneBlog } from "@/hooks/useQueryBlog";
import { useRouter } from "next/router";
import React from "react";

const Author = () => {
  const { data: userData } = useAuthorInfo();
  const { query } = useRouter();
  const { data: blogData } = useOneBlog(query?.id as string);

  const findUserName = (userId: number) => {
    const user = userData?.find((user) => user.id === Number(userId));
    return user ? `${user.fname} ${user.lname}` : "Unknown Author";
  };

  return (
    <div className="author">
      <img src="/rbg.jpg" className="author-img" alt="Author" />
      <p className="ronish">
        {blogData ? (
          <span>{findUserName(blogData.userId)}</span>
        ) : (
          "Loading author..."
        )}
      </p>
      <p>{"August 20, 2023"}</p>
    </div>
  );
};

export { Author };
