import React from "react";

interface IUserInfo {
  style?: React.CSSProperties;
  name: string;
  createdAt: string;
}

const Author = ({ style, name, createdAt }: IUserInfo) => {
  return (
    <div className="author w-full justify-between">
      <img src="/batman.png" className="author-img" alt="Author" />
      <div className="flex">
        <p className="ronish" style={style}>
          {name}
        </p>
        <p>{createdAt}</p>
      </div>
    </div>
  );
};

export { Author };
