import React from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { useQueryBlog } from "@/hooks/queryHook/useQueryBlog";
import { blogCreationStore } from "@/store/blogCreationStore";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { ContentSkeleton } from "./skeleton-loader/contentSkeleton";
import { Content } from "./Content";
import BlogCardList from "./BlogCardList";
import Image from "next/image";

const Main = () => {
  const {
    isLoading,
    data: blogSearch,
    hasNextPage,
    fetchNextPage,
  } = useQueryBlog("");
  const themeSnap = useSnapshot(themeStore);
  const { push } = useRouter();
  const { query: blogQuery } = useSnapshot(blogCreationStore);

  const firstItem = blogSearch?.pages?.[0]?.[0];
  const handleViewNextPost = async () => {
    console.log("View All Post clicked");
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
          <div className="image-wrappper">
            <img src="/Image.webp" className="Image" alt="Blog Image" />
            {/* <img src={firstItem?.imageUrl} className="Image" alt="Blog Image" /> */}
          </div>
          {isLoading ? (
            <ContentSkeleton />
          ) : (
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
              description={String(firstItem?.description)}
            />
          )}
          <BlogCardList />
          {hasNextPage && (
            <div className="viewPost mb-16" onClick={handleViewNextPost}>
              View All Post
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Main;
