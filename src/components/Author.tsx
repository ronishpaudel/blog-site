import { useAuthorInfo } from "@/hooks/useAuthorInfo";
import React from "react";

const Author = () => {
  const { data: fetchUserInfo } = useAuthorInfo();
  return (
    <div className="author">
      <img src="/rbg.jpg" className="author-img" />
      <p className="ronish">
        {fetchUserInfo?.fname} {fetchUserInfo?.lname}
      </p>

      <p>August 20,2023</p>
    </div>
  );
};

export { Author };
