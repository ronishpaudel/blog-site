import React from "react";

interface IUserInfo {
  style?: React.CSSProperties;
  user: {
    fname: string;
    lname: string;
  };
  createdAt: string;
}

const Author = ({ style, user, createdAt }: IUserInfo) => {
  return (
    <div className="author">
      <img src="/rbg.jpg" className="author-img" alt="Author" />
      <p className="ronish" style={style}>
        {user?.fname}

        {user?.lname}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};

export { Author };
