import { useCategoryQuery } from "@/hooks/useGetCategory";
import { useOneBlog } from "@/hooks/useQueryBlog";
import { useRouter } from "next/router";
import React from "react";

interface TagProps {
  style?: React.CSSProperties;
  category?: string;
}

const Tag = ({ style }: TagProps) => {
  const { data: categoryData } = useCategoryQuery();
  const { query } = useRouter();
  const { data: blogData } = useOneBlog(query?.id as string);

  const findCategoryName = (categoryId: string) => {
    const category = categoryData?.find(
      (category) => category.id === Number(categoryId)
    );
    return category ? category.name : "";
  };

  return (
    <p style={style} className="category">
      {blogData && <span>{findCategoryName(blogData.categoryId)}</span>}
    </p>
  );
};

export { Tag };
