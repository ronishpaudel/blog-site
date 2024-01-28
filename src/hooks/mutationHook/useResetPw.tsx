import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";

interface IUserData {
  email: string;
}

const mutateEmail = async (newUser: IUserData) => {
  const response = await API.post("/user/reset-password", newUser);
  return response.data;
};
const useResetPw = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation({
    mutationFn: mutateEmail,
    onSuccess,
  });
};
export { useResetPw };
