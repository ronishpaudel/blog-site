import { API } from "@/api/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogdataKeys } from "./useQueryBlog";

interface IVerifyData {
  token: string;
}

const verifyUserToken = async (token: string) => {
  const response = await API.post(`/user/email-confirm`, null, {
    headers: { token: token },
  });
  return response.data;
};
const useSignUpVerifyTokenMutation = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyUserToken,
    onSuccess: async () => {
      // queryClient.invalidateQueries({ queryKey: getBlogdataKeys.all });
    },
  });
};
export { useSignUpVerifyTokenMutation };
