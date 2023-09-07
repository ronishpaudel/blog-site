import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";
import { useRouter } from "next/router";
import { useOneBlog } from "@/hooks/useQueryBlog";
import parse from "html-react-parser";
import { dateFormat } from "@/utils/dateFormat";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import BlogPageSkeleton from "@/components/skeleton-loader/blogPageSkeleton";

const index: FC = () => {
  const { push, query } = useRouter();
  const { data, isLoading, isFetching } = useOneBlog(query?.id as string);
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
          className="page-wrapper"
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
