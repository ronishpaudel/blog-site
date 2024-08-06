import { API } from "@/api/API";
import { useMutation } from "@tanstack/react-query";
interface IUserData {
  password: string;
  token: string;
}

const updatePassword = async (newUser: IUserData) => {
  const response = await API.post("user/update-password", newUser);
  return response.data;
};
const useUpdatePassword = ({ onSuccess }: { onSuccess: any }) => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess,
  });
};
export { useUpdatePassword };
