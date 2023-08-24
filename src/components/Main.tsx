import React from "react";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Iblog, fetchBlogs, useQueryBlog } from "@/hooks/useQueryBlog";
import { useBlogSearch } from "@/hooks/useBlogSearch";
import { dateFormat } from "@/utils/dateFormat";
import { Content } from "./Content";
import Card from "./Card";
import Ad from "./Ad";
import { blogCreationStore } from "@/store/blogCreationStore";
import { useSnapshot } from "valtio";
import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";
import { FOOTER_COLOR_PALETTE, footerPageStore } from "@/store/footerPageStore";
import {
  SEARCH_COLOR_PALETTE,
  searchInputStore,
} from "@/store/searchInputStore";

const GG = () => {
  const { push } = useRouter();
  const { query } = blogCreationStore;

  const { data: blogSearch } = useBlogSearch(query);
  const { data } = useQueryBlog();

  return (
    <div className="card-parent" id="main">
      {blogSearch
        ? blogSearch.map((blog) => (
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
        : data?.pages.map((page: any) =>
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
  const { hasNextPage, fetchNextPage } = useQueryBlog();
  const handleViewNextPost = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  const colorSearchPaletteSnap = useSnapshot(searchInputStore);
  return (
    <main
      style={{
        backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
      }}
    >
      <div className="main">
        <div className="image-wrappper">
          <img src="/Image.png" className="Image" alt="Blog Image" />
        </div>
        <Content />
        <Ad
          style={{
            backgroundColor:
              SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
          }}
        />
        <GG />
        <div className="viewPost" onClick={handleViewNextPost}>
          View All Post
        </div>
        <Ad
          style={{
            backgroundColor:
              SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
          }}
        />
      </div>
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
