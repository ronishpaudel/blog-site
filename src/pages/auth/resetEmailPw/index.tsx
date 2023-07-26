import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const { push } = useRouter();
  return (
    <div className="signup-page">
      <AuthHeaderlogo />
      <div
        className="signup"
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="inputNbtns"
          style={{ maxWidth: "440px", width: "100%" }}
        >
          <div className="forgetpw-text">
            <span> Recovery Email Sent!</span>
            <p style={{ fontSize: "13px" }}>
              Please check your email for next steps to reset your password.
            </p>
          </div>

          <Button
            onClick={() => push("/auth/resetpw")}
            text={"contact Support"}
            style={{ maxWidth: "188px", width: "100%", marginBottom: "172px" }}
          />
          <Button
            onClick={() => push("/auth/forgetPw")}
            text={"BACK TO LOGIN"}
            style={{ backgroundColor: "black", width: "344px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
