import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogdataKeys } from "./useQueryBlog";
import { useRouter } from "next/router";

interface IUserData {
  fname: string;
  lname: string;
  phoneNumber: number;
  password: string;
  email: string;
  companyName: string;
}

const createUser = async (newUser: IUserData) => {
  const response = await API.post("/user/signup", newUser);
  return response.data;
};
const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: getBlogdataKeys.all });
    },
  });
};
export { useSignUpMutation };
