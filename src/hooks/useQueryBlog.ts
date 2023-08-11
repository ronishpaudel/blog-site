import { API } from "@/api/API";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Iblog {
  id: string;
  title: string;
  description: string;
}

const fetchUsers = async ({ pageParam = 1 }) => {
  const res = await API.get(`/blogs?page=${pageParam}&pageSize=6`);
  return res.data;
};

function useQueryBlog() {
  return useInfiniteQuery(["blogs"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length + 1;
    },
  });
}

export { useQueryBlog };
