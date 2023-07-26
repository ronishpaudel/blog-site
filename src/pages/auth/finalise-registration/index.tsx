import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { InputName } from "@/components/InputName";

const index = () => {
  const { push } = useRouter();
  return (
    <div className="signup-page">
      <AuthHeaderlogo />
      <div
        className="signup"
        style={{
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
          <Button onClick={() => push("/")} text={"SIGN UP"} />
          <Button
            onClick={() => push("/auth/forgetPw")}
            text={"BACK TO LOGIN"}
            style={{ backgroundColor: "black" }}
          />
        </div>
      </div>

      <div className="promotion" style={{ backgroundColor: "#C9CCD3" }}>
        <SrLogo />
      </div>
    </div>
  );
};

export default index;
