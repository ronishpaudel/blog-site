import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";
import { TUser } from "./useAuthorInfo";

const createUser = async (newUser: TUser) => {
  const response = await API.post("/user/registration", newUser);
  return response.data;
};

const useRegistration = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
export { useRegistration };
