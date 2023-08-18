import { API } from "@/api/API";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Iblog {
  id: string;
  title: string;
  description: string;
  category: { id: number; name: string };
  user: { id: number; fname: string; lname: string };
  imageUrl?: string;
  createdAt: string;
}

const fetchBlogs = async ({ pageParam = 1 }) => {
  const res = await API.get(`/blogs?page=${pageParam}&pageSize=10`);
  return res.data;
};

const fetchOneBlog = async (id: string) => {
  const res = await API.get(`/blogs/${id}`);
  return res.data as Iblog;
};

function useQueryBlog() {
  return useInfiniteQuery(["blogs"], fetchBlogs, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length + 1;
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 4 * 60 * 1000,
  });
}

function useOneBlog(id: string) {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchOneBlog(id),
    enabled: !!id,
  });
}

export { useQueryBlog, useOneBlog, fetchBlogs, fetchOneBlog };
