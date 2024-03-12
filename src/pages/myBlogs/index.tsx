import Header from "@/components/Header";
import BlogPageSkeleton from "@/components/skeleton-loader/blogPageSkeleton";
import { useOwnBlog } from "@/hooks/queryHook/useQueryBlog";
import React from "react";
import Footer from "@/components/Footer";
import { Tag } from "@/components/Tag";
import parse from "html-react-parser";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

const index = () => {
  const { data, isFetching, isLoading } = useOwnBlog();
  console.log({ data });
  const themeSnap = useSnapshot(themeStore);
  return (
    <div>
      <Header />
      {!data || isLoading || isFetching ? (
        <div
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
            height: "100vh",
          }}
        >
          <BlogPageSkeleton />
        </div>
      ) : (
        <div
          className="page-wrapper flex justify-center px-[20px]"
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
              ></div>
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
        </div>
      )}

      <Footer />
    </div>
  );
};

export default index;
