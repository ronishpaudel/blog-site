import { API } from "@/api/API";
import { useQuery, QueryFunction } from "@tanstack/react-query";
import { Iblog } from "./useQueryBlog";

export const searchResultKeys = {
  all: ["searchResult"] as const,
  search: (query: string) => [...searchResultKeys.all, { query }] as const,
};

type TSearchQueryKey = ReturnType<typeof searchResultKeys.search>;

const fetchBlogData: QueryFunction<Iblog[], TSearchQueryKey> = async (
  context
) => {
  const query = context.queryKey[1].query;
  const response = await API.get(`/blogs?query=${query}`);
  return response.data.results;
};

const useBlogSearch = (searchInput: string) => {
  return useQuery({
    queryKey: searchResultKeys.search(searchInput),
    queryFn: fetchBlogData,
  });
};

export { useBlogSearch };
