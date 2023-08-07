import React from "react";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { useRouter } from "next/router";
import { useQueryBlog } from "@/hooks/useQueryBlog";

const Main = () => {
  const { data } = useQueryBlog();
  const { push } = useRouter();

  return (
    <>
      <main>
        <div className="main">
          <div className="image-wrappper">
            <img src="/Image.png" className="Image" />
          </div>
          <Content />
          <Ad />
          <div className="card-parent">
            {data &&
              data.map((blog) => (
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
                  createdAt={""}
                />
              ))}
          </div>
          <div className="viewPost"> View All Post</div>
          <Ad />
        </div>
      </main>
    </>
  );
};

export { Main };
