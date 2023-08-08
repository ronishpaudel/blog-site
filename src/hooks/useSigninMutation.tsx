import { API } from "@/api/API";
import { MutationOptions, useMutation } from "@tanstack/react-query";

interface ISignInData {
  password: string;
  email: string;
  id: number;
}

const signin = async (data: ISignInData) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await API.post(`/user/signin`, data, {
    headers: { token: jwtToken },
  });
  return response.data;
};

const useSignInMutation = ({ onSuccess }: { onSuccess: (res: any) => {} }) => {
  return useMutation({
    mutationFn: signin,
    onSuccess,
  });
};

export { useSignInMutation };
