import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";
import { useRouter } from "next/router";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { AiOutlineEdit } from "react-icons/ai";
import { useOneBlog } from "@/hooks/useQueryBlog";
import parse from "html-react-parser";

const index: FC = () => {
  const { push, query } = useRouter();
  const { data } = useOneBlog(query?.id as string);

  return (
    <div>
      <Header />
      {data && (
        <div className="page-wrapper">
          <div className="blog-info">
            <Tag category={data?.category} />
            <h1>{data?.title}</h1>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Author user={data?.user} createdAt={data?.createdAt} />
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
          <img src={data?.imageUrl} className="blog-image" />
          <div style={{ fontWeight: "400", width: "100%" }}>
            {data?.description && parse(data?.description)}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PrivateRoute(index);
