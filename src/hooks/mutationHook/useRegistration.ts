import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";
import { TUser } from "../queryHook/useAuthorInfo";

const createUser = async (newUser: TUser) => {
  const response = await API.post("/user/registration", newUser);
  return response.data;
};

const useRegistration = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess,
  });
};
export { useRegistration };
