import AuthFooter from "@/components/AuthFooter";
import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import Button from "@/components/Button";
import { PublicRoute } from "@/components/hoc/PublicRoute";
import { useRouter } from "next/router";
import React, { FC } from "react";

const index: FC = () => {
  const { push } = useRouter();
  return (
    <div>
      <AuthHeaderlogo />
      <div className="email-wrapper">
        <div className="inputNbtns">
          <div className="forgetpw-text">
            <span> Recovery Email Sent!</span>
            <p>
              Please check your email for next steps to reset your password.
            </p>
          </div>

          <Button
            onClick={() => push("/auth/reset-password")}
            text={"contact Support"}
            className="email-btn"
            maxWidth="mW188"
          />
          <Button
            onClick={() => push("/auth/forgetPw")}
            text={"BACK TO LOGIN"}
            maxWidth="mW345"
            preset="secondary"
          />
        </div>
      </div>
      <div>
        <AuthFooter style={{ marginTop: "-30px", marginRight: "10px" }} />
      </div>
    </div>
  );
};

export default PublicRoute(index);
