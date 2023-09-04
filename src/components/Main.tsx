import React from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  Iblog,
  fetchBlogs,
  useOneBlog,
  useQueryBlog,
} from "@/hooks/useQueryBlog";
import { useBlogSearch } from "@/hooks/useBlogSearch";
import { dateFormat } from "@/utils/dateFormat";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { blogCreationStore } from "@/store/blogCreationStore";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import CardSkeleton from "./skeleton-loader/cardSkeleton";
import MainPageSkeleton from "./skeleton-loader/mainPageSkeleton";

const GG = () => {
  const { push } = useRouter();
  const { query } = useSnapshot(blogCreationStore);

  const { data: blogSearch, isLoading: searchLoading } = useBlogSearch(query);
  const { data, isLoading } = useQueryBlog();

  return (
    <div className="card-parent" id="main">
      {searchLoading || isLoading ? <CardSkeleton amount={9} /> : ""}

      {blogSearch
        ? blogSearch.map((blog) => (
            <Card
              key={blog.id}
              category={blog?.category?.name}
              title={blog.title}
              thumbnailImage={blog.thumbImageUrl}
              user={`${blog?.user?.username} `}
              createdAt={dateFormat(blog.createdAt)}
              onCardClick={() => {
                push({
                  pathname: "/[id]",
                  query: {
                    id: blog.slug,
                  },
                });
              }}
              onProfileClick={() => console.log("navigate to profile with id")}
            />
          ))
        : data?.pages.map((page: any) =>
            page.map((blog: Iblog) => (
              <Card
                key={blog.id}
                category={blog?.category?.name}
                title={blog.title}
                thumbnailImage={blog.thumbImageUrl}
                user={` ${blog?.user?.username}`}
                createdAt={dateFormat(blog.createdAt)}
                onCardClick={() => {
                  push({
                    pathname: "/[id]",
                    query: {
                      id: blog.id,
                    },
                  });
                }}
                onProfileClick={() =>
                  console.log("navigate to profile with id")
                }
              />
            ))
          )}
    </div>
  );
};

const Main = () => {
  const {
    hasNextPage,
    fetchNextPage,
    isLoading,
    data: blogData,
  } = useQueryBlog();
  const handleViewNextPost = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  const themeSnap = useSnapshot(themeStore);
  const { push, query } = useRouter();
  const { data } = useOneBlog(query?.id as string);
  return (
    <main
      style={{
        backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
      }}
    >
      {isLoading || !blogData ? (
        <MainPageSkeleton />
      ) : (
        <div className="main">
          <div className="image-wrappper">
            <img src="/Image.png" className="Image" alt="Blog Image" />
          </div>
          {data ? (
            <Content
              title={data.title}
              category={data.category.name}
              createdAt={data.createdAt}
              user={data.user.username}
              onCardClick={() =>
                push({
                  pathname: "/[id]",
                  query: {
                    id: data.id,
                  },
                })
              }
            />
          ) : (
            ""
          )}
          <Ad />
          <GG />
          <div className="viewPost" onClick={handleViewNextPost}>
            View All Post
          </div>
          <Ad />
        </div>
      )}
    </main>
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
