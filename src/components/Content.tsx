import { useRouter } from "next/router";
import React from "react";

const Content = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="content" id="content" onClick={() => push("/signup")}>
        <div className="heading">
          <p className="category">Technology</p>
          <h1 className="content-title">
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>
        </div>
        <div className="author">
          <img src="/rbg.jpg" className="author-img" />
          <p className="ronish">Ronish Paudel</p>
          <p>August 20,2023</p>
        </div>
      </div>
    </>
  );
};

export { Content };
