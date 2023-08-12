import { PrivateRoute } from "@/components/hoc/PrivateRoute";
import { useSnapshot } from "valtio";
import { blogCreationStore } from "../create-blog";
import parse from "html-react-parser";
import { useCreateBlog } from "../create-blog/useCreateBlog";
import { useRouter } from "next/router";

function index() {
  const { title, description } = useSnapshot(blogCreationStore);

  const router = useRouter();

  const { mutateAsync: createBlog } = useCreateBlog({
    onSuccess: async (data) => {
      console.log("onSuccess triggered", data);
    },
  });

  return (
    <div>
      <h1>{title}</h1>
      <div>{description && parse(description)}</div>
      <button
        onClick={async () => {
          await createBlog({
            title: title,
            description: description,
          });
          // router.push("/");
        }}
      >
        save my blog
      </button>
    </div>
  );
}

export default PrivateRoute(index);
