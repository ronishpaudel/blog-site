import Header from "@/components/Header";
import { Iblog, useOwnBlog } from "@/hooks/queryHook/useQueryBlog";
import React from "react";
import Footer from "@/components/Footer";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import parse from "html-react-parser";
import { MyBlogSkeleton } from "@/components/skeleton-loader/ownedBlogSkeleton";
import { useRouter } from "next/router";
import { Link } from "lucide-react";

const index = () => {
  const { data, isFetching, isLoading } = useOwnBlog();
  const { push } = useRouter();
  const themeSnap = useSnapshot(themeStore);

  return (
    <div>
      <Header />

      <div
        className=" flex justify-center px-[20px] py-[20px] flex-col gap-[10px] "
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
        }}
      >
        <div className=" text-gray-100 text-2xl flex justify-start mt-32 font-bold underline">
          CRAFTED BLOGS
        </div>
        {isLoading ? (
          <MyBlogSkeleton />
        ) : (
          <>
            {data ? (
              data?.map((blogs: Iblog) => (
                <div
                  key={blogs.id}
                  className="cursor-pointer max-w-[1980px] w-full border border-gray-100 border-solid rounded-lg overflow-hidden"
                >
                  <div className="flex gap-[10px] p-[4px] md:flex-nowrap flex-wrap  justify-center">
                    <img
                      src={blogs.thumbImageUrl}
                      className="max-w-[300px] w-full h-[240px] object-cover object-center rounded-lg"
                      alt={blogs.title}
                    />
                    <div className="flex flex-col justify-start">
                      <div className="text-gray-100 font-semibold text-lg mb-2">
                        <div
                          className="flex justify-between"
                          onClick={() => {
                            push({
                              pathname: "/[id]",
                              query: {
                                id: blogs.slug,
                              },
                            });
                          }}
                        >
                          {blogs.title}
                          <div className="flex gap-2 flex-wrap">
                            <div
                              className="text-gray-100 cursor-pointer"
                              onClick={() => push("/edit-blog")}
                            >
                              edit
                            </div>
                            <div className="text-gray-100 cursor-pointer">
                              delete
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400 line-clamp-6">
                        {parse(blogs.description)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex  flex-col justify-center items-center text-gray-100 h-[70vh] px-[2%] text-2xl">
                <div>Sorry, you haven't crafted any blogs till now.🧐</div>
                <div className="flex text-gray-100">
                  <div>Let's embrace your crafting journey.</div>
                  <div
                    onClick={() => push("/create-blog")}
                    className="cursor-pointer text-blue-600 underline"
                  >
                    Click here.
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default index;
