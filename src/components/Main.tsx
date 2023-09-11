import React from "react";
import { useRouter } from "next/router";
import { Iblog, useQueryBlog } from "@/hooks/useQueryBlog";
import { dateFormat } from "@/utils/dateFormat";
import { Content } from "./Content";
import Card from "./Card";
import { blogCreationStore } from "@/store/blogCreationStore";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import CardSkeleton from "./skeleton-loader/cardSkeleton";
import { Input } from "./ui/input";

const BlogCardList = () => {
  const { push } = useRouter();
  const { query } = useSnapshot(blogCreationStore);

  // const { data: blogSearch, isLoading: searchLoading } = useBlogSearch(query);
  const {
    data: blogSearch,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useQueryBlog(query);

  const themeSnap = useSnapshot(themeStore);

  return (
    <>
      <div className="card-parent mt-20" id="main">
        {searchLoading ? <CardSkeleton amount={9} /> : ""}
        {!blogSearch?.pages?.[0]?.[0]?.id &&
        !searchLoading &&
        !searchFetching ? (
          <div
            style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
            className="mt-10 mb-20"
          >
            No results match that query
          </div>
        ) : (
          ""
        )}
        {blogSearch?.pages.map((page: any) =>
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
                    id: blog.slug,
                  },
                });
              }}
              onProfileClick={() => console.log("navigate to profile with id")}
            />
          ))
        )}
      </div>
    </>
  );
};

const Main = () => {
  const { data: blogSearch, hasNextPage, fetchNextPage } = useQueryBlog("");

  const themeSnap = useSnapshot(themeStore);
  const { push } = useRouter();
  const { query: blogQuery } = useSnapshot(blogCreationStore);

  const firstItem = blogSearch?.pages?.[0]?.[0];
  const handleViewNextPost = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  return (
    <main
      style={{
        backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
      }}
    >
      {blogQuery ? (
        <div className="main mt-28 mb-10 ">
          <BlogCardList />
        </div>
      ) : (
        <div className="main">
          <div className="main-search">
            <Input type="search" placeholder="Search" className="h-full" />
          </div>
          <div className="image-wrappper">
            <img src="/Image.png" className="Image" alt="Blog Image" />
          </div>
          <Content
            title={firstItem?.title}
            category={firstItem?.category?.name}
            createdAt={firstItem?.createdAt}
            user={firstItem?.user?.username}
            onCardClick={() =>
              push({
                pathname: "/[id]",
                query: {
                  id: firstItem?.slug,
                },
              })
            }
          />

          <BlogCardList />
          <div className="viewPost mb-16" onClick={handleViewNextPost}>
            View All Post
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
