import { API } from "@/api/API";
import { useQuery } from "@tanstack/react-query";

export interface IAuthor {
  id?: string;
  fname: string;
  lname: string;
  imageUrl?: string;
}
async function fetchAuthorInfo() {
  const res = await API.get("/user/me");
  return res.data;
}

function useAuthorInfo() {
  return useQuery({
    queryKey: ["authorInfo"],
    queryFn: fetchAuthorInfo,
  });
}
export { useAuthorInfo };
