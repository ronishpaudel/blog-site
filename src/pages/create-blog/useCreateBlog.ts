import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface INewBlog {
  title: string;
  description: string;
  imageUrl?: string;
  categoryId?: number;
  id: number;
}
export const createBlog = async (newBlog: INewBlog) => {
  const response = await API.post("/blogs", newBlog);
  return response.data;
};

const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
  });
};
export { useCreateBlog };
