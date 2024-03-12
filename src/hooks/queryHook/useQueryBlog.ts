import { API } from "@/api/API";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export interface Iblog {
  id: string;
  title: string;
  description: string;
  category: { id: number; name: string };
  user: { id: number; username: string };
  imageUrl?: string;
  thumbImageUrl?: string;
  createdAt: string;
  slug: string;
}

const fetchBlogs = async (
  _context: QueryFunctionContext<string[], any>,
  queryVal: string
) => {
  const res = await API.get(`/blogs`, {
    params: {
      page: _context.pageParam,
      pageSize: 9,
      q: queryVal || "",
    },
  });
  return res.data;
};

const fetchOneBlog = async (slug: string) => {
  const res = await API.get(`/blogs/${slug}`);
  return res.data as Iblog;
};
const fetchOwnBlog = async () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const res = await API.get("/myblogs", {
    headers: { token: jwtToken },
  });
  console.log({ resdata: res.data });
  return res.data;
};

function useQueryBlog(queryVal: string, ...rest: any) {
  return useInfiniteQuery(
    ["blogs", queryVal],
    (_context) => fetchBlogs(_context, queryVal),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length + 1;
      },
      cacheTime: 5 * 60 * 1000,
      staleTime: 4 * 60 * 1000,

      ...rest,
    }
  );
}

function useOneBlog(id: string) {
  return useQuery({
    queryKey: ["blog"],

    queryFn: () => fetchOneBlog(id),
    enabled: !!id,
  });
}
function useOwnBlog() {
  return useQuery({
    queryKey: ["ownBlog"],

    queryFn: () => fetchOwnBlog(),
  });
}

export { useQueryBlog, useOneBlog, fetchBlogs, fetchOneBlog, useOwnBlog };
