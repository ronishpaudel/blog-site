import { API } from "@/api/API";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Iblog {
  id: string;
  title: string;
  description: string;
}

const fetchUsers = async ({ pageParam = 1 }) => {
  const res = await API.get(`/blogs?page=${pageParam}&pageSize=6`);
  return res.data;
};

const fetchOneBlog = async (id: string) => {
  const res = await API.get(`/blogs/${id}`);
  return res.data;
};

function useQueryBlog() {
  return useInfiniteQuery(["blogs"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length + 1;
    },
  });
}

function useOneBlog(id: string) {
  return useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchOneBlog(id),
    enabled: !!id,
  });
}

export { useQueryBlog, useOneBlog };
