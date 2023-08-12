import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBlog } from "./useCreateBlog";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import Editor from "@/components/lexical/Editor";
import Header from "@/components/Header";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import parse from "html-react-parser";
import { proxy } from "valtio";

export const blogCreationStore = proxy<{
  title: string;
  description: string;
  setDetail: (title: string, description: string) => void;
}>({
  title: "",
  description: "",
  setDetail(title, description) {
    this.title = title;
    this.description = description;
  },
});

const index: FC = () => {
  const [title, setTitle] = useState("");
  const { push } = useRouter();
  const [htmlToParse, setHtmlToParse] = useState("");
  const [editor] = useLexicalComposerContext();

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <>
      <Header />
      {htmlToParse && parse(htmlToParse)}
      {/* {console.log(htmlToParse && parse(htmlToParse))} */}
      <div className="form-container">
        <div>
          <div className="title-input">
            <h3 style={{ paddingBottom: "20px" }}>Title</h3>
            <TextInput
              text="title"
              placeholder="Enter your desired title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              maxWidth="mW700"
            />
          </div>
          <div>
            <h3>Description</h3>
            <Editor />
          </div>
          <div
            style={{
              paddingBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              text={"Publish"}
              onClick={() => {
                editor.update(async () => {
                  const htmlString = $generateHtmlFromNodes(editor, null);
                  blogCreationStore.setDetail(title, htmlString);
                });
                push("/recheck-blog");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(index);
// export default index;
