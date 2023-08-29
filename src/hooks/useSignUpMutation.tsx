import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUserData {
  username: string;
  password: string;
  email: string;
}

const createUser = async (newUser: IUserData) => {
  const response = await API.post("/user/signup", newUser);
  return response.data;
};
const useSignUpMutation = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess,
  });
};
export { useSignUpMutation };
