import AuthHeaderlogo from "@/components/AuthHeaderlogo";
import { SrLogo } from "../../../../public";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import AuthFooter from "@/components/AuthFooter";
import { useSignUpVerifyTokenMutation } from "@/hooks/useSignUpVerifyTokenMutation";
import { useEffect } from "react";

const index = () => {
  const { push, query } = useRouter();
  const { mutate, isLoading, isSuccess, isError } =
    useSignUpVerifyTokenMutation();
  console.log({ token: query.token });

  useEffect(() => {
    if (query.token && typeof query.token === "string") {
      mutate(query.token);
    }
  }, [query.token]);
  console.log(query.token);
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
          {isLoading && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>Loading.....</h3>
              <h4>Pls wait for a while </h4>
              <h4>We are verfying your acc</h4>
            </div>
          )}
          <div className="email-confirm">
            <div className="email-txt">
              {isSuccess && <h1>Your acc has been verified successfully</h1>}
              {isError && <h1>Invalid userInfo</h1>}
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
