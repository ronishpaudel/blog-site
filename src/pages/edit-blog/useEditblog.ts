import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";

interface IUpdateBlog {
  id?: number;
  title: string;
  description: string;
  categoryId?: number;
  imageUrl?: string;
}
export const editBlog = async (updateBlog: IUpdateBlog) => {
  const response = await API.put(`/blogs`, updateBlog);
  return response.data;
};

const useEditBlog = () => {
  return useMutation({
    mutationFn: editBlog,
  });
};
export { useEditBlog };
