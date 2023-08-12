import { API } from "@/api/API";
import { QueryFunction, useQuery } from "@tanstack/react-query";

interface Tcategory {
  id?: string;
  name: String;
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

const useCategoryQuery = () => {
  return useQuery({
    queryKey: getCategoryKeys.all,
    queryFn: fetchCategoryData,
  });
};

export { useCategoryQuery };
