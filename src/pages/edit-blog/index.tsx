import { TextInput } from "@/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/router";
import Button from "@/components/Button";

import { useEditBlog } from "../../hooks/mutationHook/useEditblog";
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
  const { push, query } = useRouter();
  const [title, setTitle] = useState(query.title);

  const { mutateAsync: editBlog } = useEditBlog();

  const onSubmit = async (data: ICreateBlog) => {
    try {
      await editBlog({
        title: String(data.title),
        description: String(data.description),
      });

      await push("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  function handleTitleChange(e: any) {
    setTitle(e.target.value);
  }

  return (
    <>
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <TextInput
            style={{ border: "2px solid black" }}
            text="title"
            placeholder="Enter your desired title"
            name="title"
            register={register}
            value={title as string}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
          {/* <TextInput
            text="description"
            placeholder="description"
            name="description"
            register={register}
            value={desc as string}
            onChange={handleDescChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )} */}
          <Editor />
          <Button text="Update" />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default index;
