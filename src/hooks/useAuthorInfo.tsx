import { API } from "@/api/API";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface TUser {
  id?: number;
  fname: string;
  lname: string;
}

export const getUserKeys = {
  all: ["getUser"] as const,
};

type TGetUserKey = typeof getUserKeys.all;
const fetchUserData: QueryFunction<TUser[], TGetUserKey> = async () => {
  const response = await API.get("/user/me");
  return response.data;
};

const useAuthorInfo = ({ ...rest } = {}) => {
  return useQuery({
    queryKey: getUserKeys.all,
    queryFn: fetchUserData,
    ...rest,
  });
};

export { useAuthorInfo };
