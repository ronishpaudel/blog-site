import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";

export interface INewBlog {
  title: string;
  description: string;
  imageUrl?: string;
  categoryId?: number;
  id?: number;
}

export const createBlog = async (newBlog: INewBlog) => {
  const response = await API.post("/blogs", newBlog);
  return response.data;
};

const useCreateBlog = ({ onSuccess }: { onSuccess: (res: any) => {} }) => {
  return useMutation({
    mutationFn: createBlog,
    onSuccess,
  });
};
export { useCreateBlog };
