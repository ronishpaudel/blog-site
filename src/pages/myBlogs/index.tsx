import Header from "@/components/Header";
import BlogPageSkeleton from "@/components/skeleton-loader/blogPageSkeleton";
import { useOwnBlog } from "@/hooks/queryHook/useQueryBlog";
import React from "react";
import Footer from "@/components/Footer";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";

const index = () => {
  const { data, isFetching, isLoading } = useOwnBlog();
  console.log({ data });
  const themeSnap = useSnapshot(themeStore);
  return (
    <div>
      <Header />

      <div
        className="page-wrapper flex justify-center px-[20px] py-[20px] placeholder:"
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
        }}
      >
        <div className="mt-32 max-w-[1980px] w-full  border border-gray-100 border-solid">
          <div className="flex gap-10 px-[2%]">
            <img src="/batman.png" className="max-w-[250px]  w-full" />
            <div className="flex flex-col items-center justify-center w-[60%]">
              <div className="text-gray-300">a</div>
              <div className="text-gray-300">b</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default index;
