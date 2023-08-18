import React from "react";

interface TagProps {
  style?: React.CSSProperties;
  category: { id?: number; name: string };
}

const Tag = ({ style, category }: TagProps) => {
  return (
    <p style={style} className="category">
      {category?.name}
    </p>
  );
};

export { Tag };
