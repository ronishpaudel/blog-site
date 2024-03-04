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
import BlogPageSkeleton from "@/components/skeleton-loader/blogPageSkeleton";
import { LatestBlog } from "@/components/latestBlog";

const Index: FC = () => {
  const { push, query } = useRouter();
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const themeSnap = useSnapshot(themeStore);
  const { data, isLoading, isFetching } = useOneBlog(selectedBlogId!);
  const { data: latestBlog } = useQueryBlog("");

  useEffect(() => {
    if (query?.id) {
      setSelectedBlogId(query.id as string);
      setLoading(true);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleCardClick = (blogId: string) => {
    setSelectedBlogId(blogId);
    push(`/${blogId}`);
    setLoading(true);
  };

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
        >
          {loading ? <BlogPageSkeleton /> : null}
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
          <div className="max-w-[400px] w-full text-white mt-[115px]  lg:block hidden">
            <div className="border-2 border-slate-400 flex flex-col items-center justify-center py-4 px-6 rounded-lg bg-gray-800">
              <div className="text-2xl font-bold mb-4">Latest Blogs</div>
              {limitedBlogPages.map((blog: Iblog) => (
                <LatestBlog
                  key={blog.id}
                  image={blog.thumbImageUrl as string}
                  title={blog.title}
                  description={blog.description}
                  onCardClick={() => handleCardClick(blog.slug)}
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

export default Index;
