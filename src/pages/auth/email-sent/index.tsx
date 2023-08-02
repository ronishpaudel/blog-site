import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";
import { useSignUpVerifyTokenMutation } from "@/hooks/useSignUpVerifyTokenMutation";
import { useEffect } from "react";

const index = () => {
  const { push } = useRouter();

  return (
    <div className="signup-page">
      <div className="signup-page-wrapper">
        <AuthHeaderlogo />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="email-confirm">
            <div className="email-txt">
              <span>We have sent you a mail </span>
              <p>Please check your email for the next step for signup.</p>
            </div>

            <Button text={"CONTACT SUPPORT"} maxWidth="mW188" />
            <Button
              onClick={() => push("/auth/finalise-registration")}
              text={"CONTINUE TO NEXT"}
              preset="secondary"
              maxWidth="mW440"
            />
          </div>
        </div>
        <div>
          <AuthFooter style={{ marginTop: "-30px" }} />
        </div>
      </div>

      <div className="promo" style={{ backgroundColor: "#C9CCD3" }}>
        <div className="promo-logo">
          <SrLogo />
        </div>
      </div>
    </div>
  );
};

export default index;
