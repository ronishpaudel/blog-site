import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";

interface IUserData {
  username: string;
  password: string;
  email: string;
}

const createUser = async (newUser: IUserData) => {
  const response = await API.post("/user/signup", newUser);
  return response.data;
};
const useSignUpMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: any;
  onError: any;
}) => {
  return useMutation({
    mutationFn: createUser,
    onSuccess,
    onError,
  });
};
export { useSignUpMutation };
