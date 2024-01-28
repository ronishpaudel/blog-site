import React, { FC } from "react";
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
  const { push, query } = useRouter();
  const { data, isLoading, isFetching } = useOneBlog(query?.id as string);
  const themeSnap = useSnapshot(themeStore);
  const { data: latestBlog } = useQueryBlog("");

  const blogPages = Array.isArray(latestBlog?.pages)
    ? latestBlog?.pages[0]
    : [];
  const limitedBlogPages = blogPages.slice(0, 5);

  return (
    <div>
      <Header />
      {!data || isLoading || isFetching ? (
        <div
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
            height: "100vh",
          }}
          className="flex
          justify-center items-center"
        >
          <BlogPageSkeleton />
        </div>
      ) : (
        <div
          className="page-wrapper flex justify-center  "
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
          }}
        >
          <div className="blog-wrapper ">
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
                {/* <AiOutlineEdit
                  style={{ fontSize: "25px", color: " #97989f" }}
                  onClick={() =>
                    push({
                      pathname: "/edit-blog",
                      query: {
                        id: query.id,
                      },
                    })
                  }
                /> */}
              </div>
            </div>
            <img src={data?.imageUrl} className="blog-image" />
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
          <div className="w-[350px] text-white mt-[115px]  lg:block hidden">
            <div className="border-2 border-slate-400 flex flex-col items-center justify-center py-4 px-6 rounded-lg bg-gray-800">
              <div className="text-2xl font-bold mb-4">Latest Blogs</div>
              {limitedBlogPages.map((blog: Iblog) => (
                <LatestBlog
                  key={blog.id}
                  image={blog.thumbImageUrl as string}
                  title={blog.title}
                  description={blog.description}
                  onCardClick={() => {
                    const newTab = window.open(
                      `/[id]?id=${blog.slug}`,
                      "_blank"
                    );
                    if (newTab) {
                      newTab.focus();
                    }
                  }}
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
