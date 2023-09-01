import { TextInput } from "@/components/TextInput";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import Editor from "@/components/lexical/Editor";
import Header from "@/components/Header";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { proxy, useSnapshot } from "valtio";
import { useCategoryQuery } from "@/hooks/useGetCategory";
import Dropdown from "@/components/Dropdown";
import { blogCreationStore } from "@/store/blogCreationStore";
import { resizeImage2 } from "@/utils/resizeImage";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { ColorRing } from "react-loader-spinner";

function getBase64ImageSize(base64String: string): number {
  const paddingIndex = base64String.indexOf("=");
  const contentWithoutPadding =
    paddingIndex === -1
      ? base64String
      : base64String.substring(0, paddingIndex);
  const sizeInBytes = (contentWithoutPadding.length * 3) / 4;
  return sizeInBytes;
}

const index: FC = () => {
  const [title, setTitle] = useState(blogCreationStore.title);
  const [description, setDescription] = useState(blogCreationStore.description);
  const { push } = useRouter();
  const [file, setFile] = useState<any>(blogCreationStore.imageUrl);
  const [imageSizeError, setImageSizeError] = useState<string>("");
  const [fileType, setFileType] = useState("");

  const { data } = useCategoryQuery();
  const [editor] = useLexicalComposerContext();

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        setFile(e?.target?.result as any);

        const base64ImageSize = getBase64ImageSize(e?.target?.result as string);
        if (base64ImageSize > 2 * 1024 * 1024) {
          setImageSizeError("Image size exceeds 2 MB.");
          setFile(null);
          setFileType("");
        } else {
          setImageSizeError("");
          const resizedImageURL = await resizeImage2(
            e?.target?.result as string,
            500
          );
          blogCreationStore.setThumbImageUrl(String(resizedImageURL));
        }
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

  function handleOnClick() {
    if (title || file || description) {
      editor.update(async () => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        blogCreationStore.setDescription(htmlString);
        blogCreationStore.setTitle(title);
        blogCreationStore.setImage(file);
      });

      push("/recheck-blog");
    } else {
      return (
        <>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#4b6bfb", "#4b6bfb", "#4b6bfb", "#4b6bfb", "#4b6bfb"]}
          />
        </>
      );
    }
  }
  return (
    <>
      <Header />

      <div
        className="form-container"
        style={{ backgroundColor: THEME_PALETTE[themeStore.theme].cardBg }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div className="title-input mt-20">
            <TextInput
              text="Title"
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
                  <canvas id="canvas" style={{ display: "none" }} />
                </div>
              )}
              {imageSizeError && (
                <div className="error-message">{imageSizeError}</div>
              )}
            </div>
            <div
              className="create-dropdown"
              style={{
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#0057ff",
              }}
            >
              <Dropdown
                options={categoryOptions || []}
                onChange={(val) =>
                  blogCreationStore.setCategory({
                    id: Number(val.id),
                    displayName: val.displayName,
                  })
                }
                style={{
                  maxWidth: "170px",
                  width: "100%",
                  position: "absolute",
                  right: "20%",
                }}
                label="Select Category"
              />
            </div>
          </div>
          <div>
            <Editor value={description} onChange={handleDescriptionChange} />
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
                  blogCreationStore.setDescription(htmlString);
                  blogCreationStore.setTitle(title);
                  blogCreationStore.setImage(file);
                });

                {
                  title ? push("/recheck-blog") : "";
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(index);
