import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { InputName } from "@/components/InputName";
import AuthFooter from "@/components/AuthFooter";

const index = () => {
  const { push } = useRouter();
  return (
    <div className="signup-page">
      <div className="signup-page-wrapper">
        <AuthHeaderlogo />
        <div className="registration-wrapper">
          <div className="registration-btn">
            <div
              className="finalise-header"
              style={{ color: "rgba(0, 0, 0, 0.87", fontWeight: " 500" }}
            >
              SET YOUR PASSWORD
            </div>
            <InputName text="password" placeholder="Enter your password" />
            <InputName
              text="Confirm password"
              placeholder="Confirm your password"
            />
            <Button
              onClick={() => push("/")}
              text={"SIGN UP"}
              preset="primary"
              maxWidth="mW440"
            />
            <Button
              onClick={() => push("/auth/email-confirm")}
              text={"BACK TO LOGIN"}
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
