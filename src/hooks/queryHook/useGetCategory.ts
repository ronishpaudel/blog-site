import { API } from "@/api/API";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface Tcategory {
  id: number;
  name: string;
}

export const getCategoryKeys = {
  all: ["getCategory"] as const,
};

type TGetCategoryKey = typeof getCategoryKeys.all;
const fetchCategoryData: QueryFunction<
  Tcategory[],
  TGetCategoryKey
> = async () => {
  const response = await API.get("/user/category");
  return response.data;
};

const useCategoryQuery = ({ ...rest } = {}) => {
  return useQuery({
    queryKey: getCategoryKeys.all,
    queryFn: fetchCategoryData,
    ...rest,
  });
};

export { useCategoryQuery };
