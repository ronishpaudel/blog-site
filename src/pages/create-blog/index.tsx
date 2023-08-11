import { InputName } from "@/components/InputName";
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
import Footer from "@/components/Footer";

interface ICreateBlog {
  id: Number;
  title: string;
  description: string;
}

const schema = z.object({
  title: z.string().min(4).max(20),
  description: z.string().min(4).max(300),
});

const index: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateBlog>({
    resolver: zodResolver(schema),
  });
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { push } = useRouter();
  const { mutateAsync: createBlog } = useCreateBlog();

  const onSubmit = async (data: ICreateBlog) => {
    try {
      await createBlog({
        id: Number(data.id),
        title: data.title,
        description: data.description,
      });

      await push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  function handleTitleChange(e: any) {
    setTitle(e.target.value);
  }
  function handleDescChange(e: any) {
    setDescription(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="title-input">
            <h3 style={{ paddingBottom: "20px" }}>Title</h3>
            <InputName
              style={{
                boxShadow: " 1px 1px 3px black",
              }}
              text="title"
              placeholder="Enter your desired title"
              name="title"
              register={register}
              value={title}
              onChange={handleTitleChange}
              maxWidth="mW700"
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message}</p>
            )}
          </div>
          <div>
            <h3>Description</h3>
            <Editor onChange={handleDescChange} value={description} />
          </div>
          <div
            style={{
              paddingBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button text="publish" />
          </div>
        </form>
      </div>
    </>
  );
};

// export default PrivateRoute(index);
export default index;
