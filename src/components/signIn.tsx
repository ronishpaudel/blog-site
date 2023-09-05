import { DialogHeader, Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignInMutation } from "@/hooks/useSigninMutation";
import { saveItemToLocalStorage } from "@/store/storage";
import { authStore } from "@/store/authStore";
import { useState } from "react";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useSnapshot } from "valtio";
import { modalStore } from "@/store/modalStore";
import { TUser, useAuthorInfo } from "@/hooks/useAuthorInfo";
import { useRegistration } from "@/hooks/useRegistration";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { ColorRing } from "react-loader-spinner";
function SignIn({ onClick }: { onClick?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isLoading, isSuccess, isError } = useSignInMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);
      authStore.setLoggedIn();
    },
    onError: (error) => {
      console.log({ error: error.errorType });
      if (error) {
        const { errorType, message } = error;
        setErrorMessage(message);

        if (errorType === "USER_NOT_FOUND") {
          setErrorMessage(" Please sign up.User not found ");
        } else if (errorType === "INVALID_CREDENTIALS") {
          setErrorMessage("Password doesn't match");
        } else if (errorType === "USER_NOT_VERIFIED") {
          setErrorMessage("We have sent you a mail.pls,verify your account");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
  });

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  function handleShowSignUp() {
    modalStore.signUpModal.setOpen(true);
  }
  function handleShowForgotPassword() {
    modalStore.forgotPassword.setOpen(true);
  }
  const themeSnap = useSnapshot(themeStore);
  const { signInModal } = useSnapshot(modalStore);

  const { mutate: googleMutate } = useRegistration();
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const tokenId = credentialResponse.credential;

    if (!tokenId) {
      console.log("Token ID is missing");
      return;
    }

    const newUser: TUser = {
      googleAuthToken: tokenId,
    };

    try {
      googleMutate(newUser, {
        onSuccess: (data) => {
          console.log("User created:", data);
          saveItemToLocalStorage("auth", JSON.stringify(tokenId));
          window.location.reload();
        },
        onError: (error) => {
          console.log("Failed to create user:", error);
        },
      });
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
  console.log("clientId::", CLIENT_ID);

  return (
    <div>
      <Dialog open={signInModal.open}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between  ">
              <div>
                <h1
                  className="text-black text-xl"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  techEra.io
                </h1>
                <h1
                  className="text-5xl"
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Sign in
                </h1>
              </div>
              <div>
                <p className="w-24 text-gray-500">No Account ? </p>
                <div
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={handleShowSignUp}
                >
                  Sign up
                </div>
              </div>
            </div>
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-10"
            >
              Email Address
            </span>
            <Input
              className="max-w-md mt-2.5 border-gray-400 h-12"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              style={{
                backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                color: THEME_PALETTE[themeSnap.theme].textColor,
              }}
            />
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-8"
            >
              Password
            </span>
            <Input
              className="max-w-md mt-1 border-gray-400 h-12"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              onClick={handleShowForgotPassword}
              className="text-base max-w-md mt-1.5 text-blue-500 cursor-pointer hover:text-blue-600 flex justify-end "
            >
              Forgot password?
            </span>

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
                <Button
                  variant={"blue"}
                  onClick={() => modalStore.signInModal.setOpen(false)}
                >
                  Continue to homepage
                </Button>
              ) : isError ? (
                <>
                  <div className="flex flex-col items-center">
                    <div className="text-red-500 text-center">
                      {errorMessage}
                    </div>
                  </div>
                  <Button
                    variant={"blue"}
                    onClick={() =>
                      mutate({
                        email,
                        password,
                      })
                    }
                    className="mt-3"
                  >
                    Sign in
                  </Button>
                </>
              ) : (
                <Button
                  variant={"blue"}
                  onClick={() =>
                    mutate({
                      email,
                      password,
                    })
                  }
                >
                  Sign in
                </Button>
              )}
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span
                className="bg-background px-2 text-muted-foreground"
                style={{
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                  backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
                }}
              >
                Or continue with
              </span>
            </div>
            <div className="w-full grid grid-cols-2 gap-4 mt-2  ">
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GoogleLogin
                  size="large"
                  shape="square"
                  width={367}
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  text="continue_with"
                />
              </GoogleOAuthProvider>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignIn };
