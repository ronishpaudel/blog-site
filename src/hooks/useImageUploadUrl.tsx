import { API } from "@/api/API";
import { MutationFunction, useMutation } from "@tanstack/react-query";

interface S3Upload {
  uploadUrl?: string;
  url?: string;
}
export const getUploadUrlKeys = {
  all: ["getUploadUrl"] as const,
};

const fetchUploadUrlData: MutationFunction<S3Upload> = async () => {
  const response = await API.post("/s3_upload_url");
  console.log({ data: response.data });
  return response.data;
};

const useUploadUrl = ({ ...rest }) => {
  return useMutation({
    mutationFn: fetchUploadUrlData,
    mutationKey: getUploadUrlKeys.all,
    ...rest,
  });
};

export { useUploadUrl };
