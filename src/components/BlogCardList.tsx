import React from "react";
import { useRouter } from "next/router";
import { Iblog, useQueryBlog } from "@/hooks/queryHook/useQueryBlog";
import { dateFormat } from "@/utils/dateFormat";
import Card from "./Card";
import { blogCreationStore } from "@/store/blogCreationStore";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import CardSkeleton from "./skeleton-loader/cardSkeleton";
import { useDebounce } from "@/hooks/debounceHook/useDebounce";

const BlogCardList = () => {
  const { push } = useRouter();
  const { query } = useSnapshot(blogCreationStore);
  const debouncedQuery = useDebounce(query, 300);
  const {
    data: blogSearch,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useQueryBlog(debouncedQuery);
  const themeSnap = useSnapshot(themeStore);

  return (
    <>
      {searchLoading ? (
        <div className="card-parent mt-20" id="main">
          <CardSkeleton amount={9} />
        </div>
      ) : null}
      {!blogSearch?.pages?.[0]?.length && !searchLoading && !searchFetching ? (
        <div
          style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
          className="mt-16 mb-20 text-center"
        >
          No results match that query.🔍
        </div>
      ) : null}
      <div className="card-parent mt-20" id="main">
        {blogSearch?.pages.map((page: Iblog[], pageIndex: number) =>
          page.map((blog: Iblog) => (
            <Card
              key={blog.id}
              category={blog?.category?.name}
              title={blog.title}
              description={blog.description}
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

export default BlogCardList;
