import React, { FC, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";
import { useRouter } from "next/router";
import {
  Iblog,
  useOneBlog,
  useQueryBlog,
} from "@/hooks/queryHook/useQueryBlog";
import parse from "html-react-parser";
import { dateFormat } from "@/utils/dateFormat";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import BlogPageSkeleton from "@/components/skeleton-loader/blogPageSkeleton";
import { LatestBlog } from "@/components/latestBlog";

const index: FC = () => {
  const { query, push } = useRouter();
  const themeSnap = useSnapshot(themeStore);
  const { data, isLoading, isFetching, refetch } = useOneBlog(
    query.id as string
  );
  const { data: latestBlog } = useQueryBlog("");
  useEffect(() => {
    refetch();
  }, [query.id]);

  const blogPages = Array.isArray(latestBlog?.pages)
    ? latestBlog?.pages[0]
    : [];
  const limitedBlogPages = blogPages.slice(0, 5);

  return (
    <div>
      <Header />
      {!data || (isLoading && isFetching) ? (
        <div
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          }}
        >
          <div className=" w-full flex justify-center items-center h-[100vh]">
            <img src="/loader/loader.gif" alt="loader" className="w-[100px]" />
          </div>
        </div>
      ) : (
        <div
          className="page-wrapper flex justify-center"
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          }}
        >
          <div className="blog-wrapper">
            <div className="blog-info">
              <Tag category={data?.category} />
              <h1
                style={{
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
              >
                {data?.title}
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Author
                  name={`${data?.user.username} `}
                  createdAt={dateFormat(data?.createdAt)}
                />
              </div>
            </div>
            <img src={data?.thumbImageUrl} className="blog-image" />
            <div
              style={{
                fontWeight: "400",
                width: "100%",
                fontSize: "18px",
                color: THEME_PALETTE[themeStore.theme].textColor,
              }}
            >
              {data?.description && parse(data?.description)}
            </div>
          </div>
          <div className="max-w-[400px] w-full text-white mt-[115px] px-[10px] lg:block hidden ">
            <div className="border-2 border-slate-400 flex flex-col items-center justify-center py-4 px-6 rounded-lg bg-gray-800">
              <div className="text-2xl font-bold mb-4">Latest Blogs</div>
              {limitedBlogPages.map((blog: Iblog) => (
                <LatestBlog
                  key={blog.id}
                  image={blog.thumbImageUrl as string}
                  title={blog.title}
                  description={blog.description}
                  onCardClick={() =>
                    push({
                      pathname: "[id]",
                      query: {
                        id: blog.slug,
                      },
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default index;
