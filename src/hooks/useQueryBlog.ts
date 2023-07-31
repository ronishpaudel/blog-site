import { API } from "@/api/API";
import { TPost } from "@/types/TPost";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export const getBlogdataKeys = {
  all: ["getBlogData"] as const,
};
export type TGetQueryKey = typeof getBlogdataKeys.all;

const fetchBlogData: QueryFunction<TPost[], TGetQueryKey> = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

const useQueryBlog = () => {
  return useQuery({
    queryKey: getBlogdataKeys.all,
    queryFn: fetchBlogData,
  });
};

export { useQueryBlog };
