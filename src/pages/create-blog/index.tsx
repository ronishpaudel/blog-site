import { InputName } from "@/components/InputName";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBlog } from "./useCreateBlog";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { PrivateRoute } from "@/components/hoc/PrivateRoute";

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
  const [desc, setDesc] = useState();
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
    setDesc(e.target.value);
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <InputName
            text="title"
            placeholder="Enter your desired title"
            name="title"
            register={register}
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
          <InputName
            text="description"
            placeholder="description"
            name="description"
            register={register}
            value={desc}
            onChange={handleDescChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}
          <Button text="Submit" />
        </form>
      </div>
    </>
  );
};

export default PrivateRoute(index);
