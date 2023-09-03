import { useState } from "react";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useSnapshot } from "valtio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { ColorRing } from "react-loader-spinner";

function index() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const { push, query } = useRouter();
  console.log({ token: query.token });

  const { mutate, isLoading, isSuccess } = useUpdatePassword({
    onSuccess: async (res: { token: string }) => {
      localStorage.setItem("auth", JSON.stringify(query.token));
    },
  });

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  function handleRetypePasswordChange(e: any) {
    setRetypePassword(e.target.value);
  }

  const themeSnap = useSnapshot(themeStore);

  function handleOnClick() {
    const updatedPassword = password === retypePassword;

    const token = query.token;
    if (updatedPassword) {
      return mutate({ password, token: String(token) });
    } else {
      return <div className="error-message">password not match</div>;
    }
  }
  return (
    <>
      <Header />
      <div
        className="h-[100vh] "
        style={{ backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg }}
      >
        <div
          style={{
            backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
            border: `1px solid ${THEME_PALETTE[themeSnap.theme].footerBg}`,
          }}
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full"
        >
          <div className="reset-wrapper">
            <div className="flex items-center justify-between  ">
              <div>
                <h1
                  className="text-5xl"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Reset-password
                </h1>
              </div>
            </div>
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-10"
            >
              Enter your new password
            </span>
            <Input
              className="max-w-md mt-2.5 border-gray-400 h-12"
              value={password}
              onChange={handlePasswordChange}
              style={{
                backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                color: THEME_PALETTE[themeSnap.theme].textColor,
              }}
            />
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-8"
            >
              Re-type your new password
            </span>
            <Input
              className="max-w-md mt-1 border-gray-400 h-12"
              type="password"
              name="password"
              value={retypePassword}
              onChange={handleRetypePasswordChange}
            />
            <div className="mt-10 mb-10">
              {isLoading ? (
                <div className="flex justify-center ">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#4b6bfb",
                      "#4b6bfb",
                      "#4b6bfb",
                      "#4b6bfb",
                      "#4b6bfb",
                    ]}
                  />
                </div>
              ) : isSuccess ? (
                <div
                  className="text-xl flex flex-col items-center gap-3"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Password Reset Successful!
                  <Button variant={"blue"} onClick={() => push("/")}>
                    Continue to the homepage
                  </Button>
                </div>
              ) : (
                <Button variant={"blue"} onClick={handleOnClick}>
                  confirm new password
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default index;
