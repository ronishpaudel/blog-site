import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { useSnapshot } from "valtio";
import parse from "html-react-parser";
import { useCreateBlog } from "../../hooks/mutationHook/useCreateBlog";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { Author } from "@/components/Author";
import { $generateHtmlFromNodes } from "@lexical/html";
import Header from "@/components/Header";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUploadUrl } from "@/hooks/mutationHook/useImageUploadUrl";
import { fileToBlob } from "@/utils/filetoBlob";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { authStore } from "@/store/authStore";
import { blogCreationStore } from "@/store/blogCreationStore";
import { dateFormat } from "@/utils/dateFormat";
import { ColorRing } from "react-loader-spinner";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { Button } from "@/components/ui/button";
import { useDraftBlog } from "@/hooks/mutationHook/useDraftBlog";

type UploadResponse = {
  message: string;
  data: {
    normalUpload: { uploadUrl: string; url: string };
    thumbnailUpload: { uploadUrl: string; url: string };
  };
};
function index() {
  const { title, description, imageUrl, category, thumbImageUrl } =
    useSnapshot(blogCreationStore);
  const themeSnap = useSnapshot(themeStore);
  const { push } = useRouter();
  const [fileType, setFileType] = useState("");
  const [editor] = useLexicalComposerContext();
  const { dbUser } = useSnapshot(authStore);
  const queryClient = useQueryClient();

  const { mutateAsync: createBlog, isLoading: isCreating } = useCreateBlog({
    onSuccess: async (res: any) => {
      queryClient.invalidateQueries(["blogs"]);
      if (res?.slug) {
        push({
          pathname: "/[id]",
          query: {
            id: res?.slug,
          },
        });
      }
      blogCreationStore.setTitle("");
      blogCreationStore.setDescription("");
    },
  });

  const { mutateAsync: blogDraft } = useDraftBlog({
    onSuccess: async (res: any) => {
      console.log("hello");
    },
  });
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
  const { mutateAsync: s3Mutate, isLoading: isUploading } = useMutation({
    mutationFn: uploadToS3,
  });

  const { mutate: createBlogWithImage, isLoading: isCreatingUpload } =
    useUploadUrl({
      onSuccess: async (res: UploadResponse) => {
        if (imageUrl && thumbImageUrl) {
          editor.update(async () => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            const blobData = await fileToBlob(imageUrl, fileType);
            const thumbBlobData = await fileToBlob(thumbImageUrl, fileType);

            await s3Mutate({
              uploadUrl: res.data.normalUpload.uploadUrl,
              blobData: blobData,
            });
            await s3Mutate({
              uploadUrl: res.data.thumbnailUpload.uploadUrl,
              blobData: thumbBlobData,
            });

            await createBlog({
              title,
              description: htmlString,
              imageUrl: res.data.normalUpload.url,
              thumbImageUrl: res.data.thumbnailUpload.url,
              categoryId: category.id,
            });

            blogCreationStore.clearStore();
          });
        } else {
          editor.update(async () => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            await createBlog({
              title,
              description: htmlString,
              categoryId: category.id,
            });
            console.log({ id: category.id });
            blogCreationStore.clearStore();
          });
        }
      },
      onError: (error: any) => {
        console.log(error);
      },
    });

  const { mutate: blogWithImage } = useUploadUrl({
    onSuccess: async (res: UploadResponse) => {
      if (imageUrl && thumbImageUrl) {
        editor.update(async () => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          const blobData = await fileToBlob(imageUrl, fileType);
          const thumbBlobData = await fileToBlob(thumbImageUrl, fileType);

          await s3Mutate({
            uploadUrl: res.data.normalUpload.uploadUrl,
            blobData: blobData,
          });
          await s3Mutate({
            uploadUrl: res.data.thumbnailUpload.uploadUrl,
            blobData: thumbBlobData,
          });

          await blogDraft({
            title,
            description: htmlString,
            imageUrl: res.data.normalUpload.url,
            thumbImageUrl: res.data.thumbnailUpload.url,
            categoryId: category.id,
          });
        });
      } else {
        editor.update(async () => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          await blogDraft({
            title,
            description: htmlString,
            categoryId: category.id,
          });
          console.log({ id: category.id });
        });
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  const handleOnSubmit = async () => {
    if (isCreating || isUploading || isCreatingUpload || !title) {
      return;
    }

    createBlogWithImage({});
  };
  function handleBlogDraft() {
    blogWithImage({});
  }
  return (
    <div>
      <Header />
      <div
        className="page-wrapper flex justify-center items-center"
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
        }}
      >
        <div className="blog-wrapper">
          <div className="blog-info">
            <div
              style={{
                color: THEME_PALETTE[themeSnap.theme].textColor,
              }}
            >
              preview of your blog
            </div>
            <div className="category">{category.displayName}</div>
            <h1
              style={{
                color: THEME_PALETTE[themeSnap.theme].textColor,
              }}
            >
              {title}
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
                name={` ${dbUser?.username}`}
                createdAt={dateFormat(new Date().toLocaleDateString())}
              />
            </div>
          </div>
          <img src={imageUrl} className="blog-image" />
          <div
            style={{
              color: THEME_PALETTE[themeSnap.theme].textColor,
              width: "100%",
            }}
          >
            {description && parse(description)}
          </div>

          {isCreating || isUploading || isCreatingUpload ? (
            <div className="text-center flex justify-center items-center">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#4b6bfb", "#4b6bfb", "#4b6bfb", "#4b6bfb", "#4b6bfb"]}
              />
            </div>
          ) : (
            <div className="flex justify-evenly">
              <Button
                onClick={() => handleBlogDraft()}
                variant={"yellow"}
                className="w-[250px] text-black"
              >
                Save draft
              </Button>
              <Button
                onClick={() => handleOnSubmit()}
                variant={"blue"}
                className="w-[250px] text-black"
              >
                Publish
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivateRoute(index);
