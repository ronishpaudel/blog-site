import React, { FC } from "react";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { useRouter } from "next/router";
import { Iblog, useQueryBlog } from "@/hooks/useQueryBlog";

const Main: FC = () => {
  const { data, hasNextPage, fetchNextPage } = useQueryBlog();
  const { push } = useRouter();

  const handleViewNextPost = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
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
          <div className="card-parent" id="main">
            {data?.pages.map((page: any) =>
              page.map((blog: Iblog) => (
                <Card
                  key={blog.id}
                  title={blog.title}
                  onCardClick={() => {
                    push({
                      pathname: "/[id]",
                      query: {
                        id: blog.id,
                        title: blog.title,
                        description: blog.description,
                      },
                    });
                  }}
                  onProfileClick={() =>
                    console.log("navigate to profile with id")
                  }
                  createdAt={""} // You can replace this with the actual createdAt value
                />
              ))
            )}
          </div>
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
