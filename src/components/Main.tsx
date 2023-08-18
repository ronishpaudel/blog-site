import React, { FC } from "react";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { useRouter } from "next/router";
import { Iblog, useQueryBlog } from "@/hooks/useQueryBlog";
import { dateFormat } from "@/utils/dateFormat";

const GG = () => {
  const { push } = useRouter();

  const { data, hasNextPage, fetchNextPage } = useQueryBlog();

  return (
    <div className="card-parent" id="main">
      {data?.pages.map((page: any) =>
        page.map((blog: Iblog) => (
          <Card
            key={blog.id}
            category={blog?.category?.name}
            title={blog.title}
            image={blog.imageUrl}
            user={`${blog?.user?.fname} ${blog?.user?.lname}`}
            createdAt={dateFormat(blog.createdAt)}
            onCardClick={() => {
              push({
                pathname: "/[id]",
                query: {
                  id: blog.id,
                },
              });
            }}
            onProfileClick={() => console.log("navigate to profile with id")}
          />
        ))
      )}
    </div>
  );
};
const Main: FC = () => {
  const handleViewNextPost = async () => {
    // if (hasNextPage) {
    //   await fetchNextPage();
    // }
  };

  return (
    <>
      <main>
        <div className="main">
          <div className="image-wrappper">
            <img src="/Image.png" className="Image" />
          </div>
          <Content />
          <Ad />
          <GG />
          <div className="viewPost" onClick={handleViewNextPost}>
            View All Post
          </div>
          <Ad />
        </div>
      </main>
    </>
  );
};

export default Main;
