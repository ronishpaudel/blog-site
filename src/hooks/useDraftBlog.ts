import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";

export interface INewBlog {
  title: string;
  description: string;
  imageUrl?: string;
  categoryId?: number;
  id?: number;
  thumbImageUrl?: string;
}

export const draftBlog = async (newBlog: INewBlog) => {
  const response = await API.post("/draft-blogs", newBlog);
  return response.data;
};

const useDraftBlog = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation({
    mutationFn: draftBlog,
    onSuccess,
  });
};
export { useDraftBlog };
