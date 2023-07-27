import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";

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
              <span>Confirm your email address</span>
              <p>Please check your email for the next step for signup.</p>
            </div>

            <Button text={"CONTACT SUPPORT"} maxWidth="mW188" />
            <Button
              onClick={() => push("/auth/finalise-registration")}
              text={"CONTINUE UX"}
              preset="secondary"
              maxWidth="mW145"
            />
            <Button
              onClick={() => push("/auth/signup")}
              text={"BACK TO LOGIN"}
              preset="secondary"
              maxWidth="mW345"
            />
          </div>
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
