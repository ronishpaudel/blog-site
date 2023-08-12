import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";
import Ad from "@/components/Ad";
import { useRouter } from "next/router";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { AiOutlineEdit } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/api/API";
import { useOneBlog } from "@/hooks/useQueryBlog";
import parse from "html-react-parser";

const index: FC = () => {
  const { push, query } = useRouter();
  const { data } = useOneBlog(query?.id as string);

  return (
    <div>
      <Header />

      <div className="page-wrapper">
        <div className="blog-info">
          <Tag />

          <h1>{data?.title}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Author />
            <AiOutlineEdit
              style={{ fontSize: "25px", color: " #97989f" }}
              onClick={() =>
                push({
                  pathname: "/edit-blog",
                  query: {
                    id: query.id,
                  },
                })
              }
            />
          </div>
        </div>
        <img src="/img.png" className="blog-image" />
        <div style={{ fontWeight: "400" }}>
          {data?.description && parse(data?.description)}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default index;
