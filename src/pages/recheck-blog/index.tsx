import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { useSnapshot } from "valtio";
import { blogCreationStore } from "../create-blog";
import parse from "html-react-parser";
import { useCreateBlog } from "../create-blog/useCreateBlog";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { $generateHtmlFromNodes } from "@lexical/html";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUploadUrl } from "@/hooks/useImageUploadUrl";
import { fileToBlob } from "@/utils/filetoBlob";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCategoryQuery } from "@/hooks/useGetCategory";

type UploadResponse = {
  message: string;
  data: { uploadUrl: string; url: string };
};
function index() {
  const { title, description, imageUrl, category } =
    useSnapshot(blogCreationStore);

  const { push } = useRouter();

  const [fileType, setFileType] = useState("");
  const [editor] = useLexicalComposerContext();

  console.log({ category });

  console.log({ imageUrl });
  const { mutateAsync: createBlog } = useCreateBlog();

  const uploadToS3 = async (val: { uploadUrl: string; blobData: Blob }) => {
    return await axios({
      method: "put",
      url: val.uploadUrl,
      headers: {
        "Content-Type": fileType,
      },
      data: val.blobData,
    });
  };
  const { mutateAsync: s3Mutate } = useMutation({
    mutationFn: uploadToS3,
  });

  const { mutate: createBlogWithImage } = useUploadUrl({
    onSuccess: async (res: UploadResponse) => {
      const file = imageUrl;

      if (file) {
        console.log({ file });
        editor.update(async () => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          const blobData = await fileToBlob(file, fileType);
          console.log({ dd: res.data.uploadUrl });
          await s3Mutate({ uploadUrl: res.data.uploadUrl, blobData: blobData });
          console.log({ category });
          await createBlog({
            title,
            description: htmlString,
            imageUrl: res.data.url,
            categoryId: category.id,
          });
          console.log({ id: category.id });
          blogCreationStore.setTitle("");
          blogCreationStore.setImage("");
        });

        await push("/");
      } else {
        console.log({ category });
        console.log("else ma janu vo sir");
        editor.update(async () => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          await createBlog({
            title,
            description: htmlString,
            categoryId: category.id,
          });
          console.log({ id: category.id });
          blogCreationStore.setTitle("");
          blogCreationStore.setImage("");
        });
        await push("/");
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const handleOnSubmit = () => {
    createBlogWithImage({});
  };

  return (
    <div>
      <Header />
      <div className="page-wrapper">
        <div className="blog-info">
          <div>preview of your blog</div>
          <p className="category">{category.displayName}</p>
          <h1>{title}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Author />
          </div>
        </div>
        <img src={imageUrl} className="blog-image" />
        <div style={{ width: "100%" }}>{description && parse(description)}</div>
        <Button text={"publish now"} onClick={() => handleOnSubmit()} />
      </div>
      <Footer />
    </div>
  );
}

export default PrivateRoute(index);
