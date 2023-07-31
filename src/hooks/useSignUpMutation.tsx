import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogdataKeys } from "./useQueryBlog";

interface IUserData {
  fname: string;
  lname: string;
  phoneNumber: number;
  password: string;
  emailAddress: string;
  companyName: string;
}

const createUser = async (newUser: IUserData) => {
  const response = await API.post("/user/signup", newUser);
  return response.data;
};
const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getBlogdataKeys.all });
    },
  });
};
export { useSignUpMutation };
