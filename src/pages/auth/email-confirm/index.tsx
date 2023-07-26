import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const index = () => {
  const { push } = useRouter();
  return (
    <div className="signup-page">
      <AuthHeaderlogo />
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="signup"
      >
        <div className="email-confirm">
          <div className="email-txt">
            <span>Confirm your email address</span>
            <p>Please check your email for the next step for signup.</p>
          </div>
          <div className="email-btns">
            <Button text={"CONTACT SUPPORT"} style={{ width: "188px" }} />
            <Button
              onClick={() => push("/auth/finalise-registration")}
              text={"CONTINUE UX"}
              style={{
                backgroundColor: "black",
                width: "145px",
                marginBottom: "115px",
              }}
            />
            <Button
              onClick={() => push("/auth/signup")}
              text={"BACK TO LOGIN"}
              style={{ backgroundColor: "black", width: "344px" }}
            />
          </div>
        </div>
      </div>

      <div className="promotion" style={{ backgroundColor: "#C9CCD3" }}>
        <SrLogo />
      </div>
    </div>
  );
};

export default index;
