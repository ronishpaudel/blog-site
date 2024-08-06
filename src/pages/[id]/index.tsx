import React, { FC, useEffect, useState } from "react";
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
import { LatestBlog } from "@/components/latestBlog";
import Loading from "@/components/loading";

const index: FC = () => {
  const { query, push } = useRouter();
  const themeSnap = useSnapshot(themeStore);
  const { data, isLoading, isFetching, refetch } = useOneBlog(
    query.id as string
  );
  const { data: latestBlog } = useQueryBlog("");

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (data) {
      setLikes(data.likes || 0);
      setDislikes(data.dislikes || 0);
      setViews(data.views ? data.views + 1 : 1); // Increment view count
    }
  }, [data]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

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
            <Loading />
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
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button onClick={handleLike} className="mr-2 text-white">
                  👍 {likes}
                </button>
                <button onClick={handleDislike} className="mr-2 text-white">
                  👎 {dislikes}
                </button>
              </div>
              <div className="views text-white">👁️ {views} views</div>
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
