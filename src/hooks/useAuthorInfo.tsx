import { API } from "@/api/API";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface TUser {
  id?: number;
  fname?: string;
  lname?: string;
  username?: string;
  googleAuthToken?: string;
  isVerified?: boolean;
}

const fetchUserData = async () => {
  const response = await API.get("/user/me");
  return response.data as TUser;
};

const useAuthorInfo = ({ ...rest } = {}) => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    ...rest,
  });
};

export { useAuthorInfo };
