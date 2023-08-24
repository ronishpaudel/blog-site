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
import { dateFormat } from "@/utils/dateFormat";
import { useSnapshot } from "valtio";
import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";
import { TEXT_COLOR_PALETTE, textStore } from "@/store/textColor";

const index: FC = () => {
  const { push, query } = useRouter();
  const { data } = useOneBlog(query?.id as string);
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  const colorTextPaletteSnap = useSnapshot(textStore);

  return (
    <div>
      <Header />
      {data && (
        <div
          className="page-wrapper"
          style={{
            backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
          }}
        >
          <div className="blog-wrapper">
            <div className="blog-info">
              <Tag category={data?.category} />
              <h1
                style={{
                  color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
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
                  name={`${data?.user.fname} ${data?.user.lname}`}
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
                color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
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

export default PrivateRoute(index);
