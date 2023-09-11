import { TextInput } from "@/components/TextInput";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import Editor from "@/components/lexical/Editor";
import Header from "@/components/Header";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCategoryQuery } from "@/hooks/useGetCategory";
import { blogCreationStore } from "@/store/blogCreationStore";
import { resizeImage2 } from "@/utils/resizeImage";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { Input } from "@/components/ui/input";
import { useSnapshot } from "valtio";
import Dropdown from "@/components/Dropdown";
import { jsonParse } from "@/utils/jsonParse";
import { BsUpload } from "react-icons/bs";
import Footer from "@/components/Footer";
import { z } from "zod";

function getBase64ImageSize(base64String: string): number {
  const paddingIndex = base64String.indexOf("=");
  const contentWithoutPadding =
    paddingIndex === -1
      ? base64String
      : base64String.substring(0, paddingIndex);
  const sizeInBytes = (contentWithoutPadding.length * 3) / 4;
  return sizeInBytes;
}

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "dsf"),
});

const index: FC = () => {
  const { title } = useSnapshot(blogCreationStore);
  const { description } = useSnapshot(blogCreationStore);
  const { push } = useRouter();
  const [file, setFile] = useState<any>(blogCreationStore.imageUrl);
  const [imageSizeError, setImageSizeError] = useState<string>("");
  const [fileType, setFileType] = useState("");
  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const { data } = useCategoryQuery();
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    blogCreationStore.setTitle(e.target.value);

    setTitleError("");
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    blogCreationStore.setDescription(e.target.value);
  }

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const mainResizeImage = await resizeImage2(
          e?.target?.result as string,
          800
        );
        setFile(mainResizeImage);

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
  const themeSnap = useSnapshot(themeStore);

  const triggerFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Header />
      <div
        className="form-container "
        style={{ backgroundColor: THEME_PALETTE[themeStore.theme].cardBg }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div className="title-input mt-24">
            <div
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="text-lg"
            >
              Title
            </div>
            <Input
              placeholder="Enter your desired title"
              name="title"
              onChange={handleTitleChange}
              className="h-14 mt-2"
              ref={titleInputRef}
            />
            <div className="error-message">
              {titleError && <div>Title required</div>}
            </div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="uploadImg">
              <input
                type="file"
                onChange={handleImageSelect}
                ref={fileInputRef}
                style={{
                  backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
                  display: "none",
                }}
              />
              <div
                className="w-40 h-9 p-2 text-white flex gap-1 justify-between items-center rounded-lg "
                onClick={triggerFileInputClick}
                style={{
                  border: `1px solid ${
                    THEME_PALETTE[themeSnap.theme].textColor
                  }`,
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
              >
                <BsUpload />
                <div>Click to Upload</div>
              </div>
              {file && (
                <div className="selected-image-container">
                  <img
                    src={file}
                    alt="Selected Image"
                    style={{ marginLeft: "70px" }}
                  />
                  <p
                    style={{
                      position: "relative",
                      right: "2%",
                      cursor: "pointer",
                      fontWeight: "650",
                      color: THEME_PALETTE[themeSnap.theme].textColor,
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
            <div className="create-dropdown">
              <Dropdown
                options={categoryOptions || []}
                onChange={(val) => {
                  const parsedVal = jsonParse(val);
                  blogCreationStore.setCategory({
                    id: Number(parsedVal.id),
                    displayName: parsedVal.displayName,
                  });
                }}
              />
              <div className="error-message text-center">{categoryError}</div>
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
              text={"Preview"}
              onClick={() => {
                if (!title || blogCreationStore.category.id === 0) {
                  setCategoryError("Category required");
                  setTitleError("Title required");
                  if (titleInputRef.current) {
                    titleInputRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                } else if (blogCreationStore.category.id === 0) {
                  setCategoryError("Category required");
                } else {
                  setTitleError("");
                  editor.update(async () => {
                    const htmlString = $generateHtmlFromNodes(editor, null);
                    blogCreationStore.setDescription(htmlString);
                    blogCreationStore.setTitle(title);
                    blogCreationStore.setImage(file);
                  });
                  push("/recheck-blog");
                }
              }}
              className="mb-10"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivateRoute(index);
