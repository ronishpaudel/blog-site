import React from "react";

interface IUserInfo {
  style?: React.CSSProperties;
  name: string;
  createdAt: string;
}

const Author = ({ style, name, createdAt }: IUserInfo) => {
  return (
    <div className="author">
      <img src="/batman.png" className="author-img" alt="Author" />
      <p className="ronish" style={style}>
        {name}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};

export { Author };
