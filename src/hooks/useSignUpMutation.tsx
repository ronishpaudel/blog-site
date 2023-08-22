import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUserData {
  fname: string;
  lname: string;
  phoneNumber: number;
  password: string;
  email: string;
}

const createUser = async (newUser: IUserData) => {
  const response = await API.post("/user/signup", newUser);
  return response.data;
};
const useSignUpMutation = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
export { useSignUpMutation };
