import { TextInput } from "@/components/TextInput";
import React, { ChangeEvent, FC, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import Editor from "@/components/lexical/Editor";
import Header from "@/components/Header";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { proxy } from "valtio";
import { useCategoryQuery } from "@/hooks/useGetCategory";
import Dropdown from "@/components/Dropdown";

export const blogCreationStore = proxy<{
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  setDetail: (title: string, description: string, category: string) => void;
  setImage: (imageUrl: string) => void;
}>({
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  setDetail(title, description, category) {
    this.title = title;
    this.description = description;
    this.category = category;
  },
  setImage(imageUrl) {
    this.imageUrl = imageUrl;
  },
});

const index: FC = () => {
  const [title, setTitle] = useState("");
  const { push } = useRouter();
  const [file, setFile] = useState<any>(null);
  const [fileType, setFileType] = useState("");
  const [category, setCategory] = useState("");
  const { data } = useCategoryQuery();
  const [editor] = useLexicalComposerContext();

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setFile(e?.target?.result as any);
      };
      reader.readAsDataURL(file);
      setFileType(file.type);
    }
  };

  const removeImage = () => {
    setFile(null);
    setFileType("");
  };

  const categoryOptions = data?.map((category) => ({
    displayName: category.name,
    id: category.id,
  }));

  return (
    <>
      <Header />
      {/* {htmlToParse && parse(htmlToParse)} */}
      <div className="form-container">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
            <div className="error-message">
              {!title ? <div>Title required</div> : ""}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="uploadImg">
              <input type="file" onChange={handleImageSelect} />
              {file && (
                <div className="selected-image-container">
                  <img src={file} alt="Selected Image" />
                  <p
                    style={{
                      position: "relative",
                      right: "0.5%",
                      cursor: "pointer",
                      fontWeight: "630",
                    }}
                    onClick={removeImage}
                  >
                    x
                  </p>
                </div>
              )}
            </div>
            <Dropdown
              style={{}}
              options={categoryOptions || []}
              onChange={(val) => console.log(val)}
              label="Select Category"
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
              text={"preview your blog"}
              onClick={() => {
                editor.update(async () => {
                  const htmlString = $generateHtmlFromNodes(editor, null);
                  blogCreationStore.setDetail(title, htmlString, category);
                  blogCreationStore.setImage(file);
                });
                console.log({ file: blogCreationStore.setImage(file) });
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
