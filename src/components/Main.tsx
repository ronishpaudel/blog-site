import React, { FC } from "react";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { useRouter } from "next/router";
import { Iblog, fetchBlogs, useQueryBlog } from "@/hooks/useQueryBlog";
import { dateFormat } from "@/utils/dateFormat";
import { QueryClient, dehydrate } from "@tanstack/react-query";

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
            thumbnailImage={blog.thumbImageUrl}
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
const Main = () => {
  const { hasNextPage, fetchNextPage } = useQueryBlog();
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

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(["blogs"], fetchBlogs, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length + 1;
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 4 * 60 * 1000,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Main;
