import React from "react";
import { useRouter } from "next/router";
import { Iblog, useQueryBlog } from "@/hooks/queryHook/useQueryBlog";
import { dateFormat } from "@/utils/dateFormat";
import { Content } from "./Content";
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

  // const { data: blogSearch, isLoading: searchLoading } = useBlogSearch(query);
  const {
    data: blogSearch,
    isLoading: searchLoading,
    isFetching: searchFetching,
  } = useQueryBlog(debouncedQuery);

  const themeSnap = useSnapshot(themeStore);
  console.log(blogSearch);
  return (
    <>
      {/* <div className="card-parent mt-20" id="main"> */}
      {searchLoading ? (
        <div className="card-parent mt-20" id="main">
          <CardSkeleton amount={9} />
        </div>
      ) : (
        ""
      )}
      {!blogSearch?.pages?.[0]?.[0]?.id && !searchLoading && !searchFetching ? (
        <div
          style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
          className="mt-16 mb-20 text-center"
        >
          No results match that query.🔍
        </div>
      ) : (
        ""
      )}
      <div className="card-parent mt-20" id="main">
        {Array.isArray(
          blogSearch?.pages.map((page: any) =>
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
                onProfileClick={() =>
                  console.log("navigate to profile with id")
                }
              />
            ))
          )
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
            <img src="/Image.png" className="Image" alt="Blog Image" />
            {/* <img src={firstItem?.imageUrl} className="Image" alt="Blog Image" /> */}
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
            description={String(firstItem?.description)}
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
