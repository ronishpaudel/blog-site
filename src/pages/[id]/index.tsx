import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Author } from "@/components/Author";
import { Tag } from "@/components/Tag";

const index = () => {
  return (
    <div className="id-page">
      <Header />
      <div className="page-wrapper">
        <Tag style={{ alignSelf: "flex-start" }} />
        <h1>
          The Impact of Technology on the Workplace: How Technology is Changing
        </h1>
        <img src="/img.png" />
        <Author />
      </div>
      <Footer />
    </div>
  );
};

export default index;
