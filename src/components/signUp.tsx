import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSignUpMutation } from "@/hooks/useSignUpMutation";
import { saveItemToLocalStorage } from "@/store/storage";
import { authStore } from "@/store/authStore";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { modalStore } from "@/store/modalStore";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useRouter } from "next/router";
import { useRegistration } from "@/hooks/useRegistration";
import { TUser } from "@/hooks/useAuthorInfo";

function SignUp({ onSignInClick }: { onSignInClick?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  function handleUserNameChange(e: any) {
    setUserName(e.target.value);
  }
  const { mutate } = useSignUpMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);
      authStore.setLoggedIn();
      window.location.reload();
    },
  });
  function handleOnClick() {
    modalStore.signUpModal.setOpen(false);
  }
  const themeSnap = useSnapshot(themeStore);
  const { signUpModal } = useSnapshot(modalStore);

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

  return (
    <div>
      <Dialog open={signUpModal.open}>
        <DialogContent>
          <div className="flex items-center justify-between  ">
            <div>
              <h1
                className="text-black text-xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                Welcome to Lorem
              </h1>
              <h1
                className="text-5xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                Sign up
              </h1>
            </div>
            <div>
              <p className=" text-gray-500">Have an Account ?</p>
              <p
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                onClick={handleOnClick}
              >
                Sign in
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-10"
            >
              Enter your email address
            </span>
            <Input
              className="max-w-sm border-gray-400 h-12"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />

            <span
              className="mt-2"
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
            >
              user name
            </span>
            <Input
              className="max-w-sm  border-gray-400 h-12"
              name="username"
              value={username}
              onChange={handleUserNameChange}
            />
          </div>
          <span style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}>
            Enter your Password
          </span>
          <Input
            className="max-w-sm border-gray-400 h-12"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="text-base max-w-md mt-1.5 text-blue-500 cursor-pointer hover:text-blue-600 flex justify-end ">
            Forgot password?
          </span>
          <div className="mt-5 mb-5">
            <Button
              onClick={() =>
                mutate({
                  email,
                  username,
                  password,
                })
              }
              className="max-w-sm w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              Sign Up
            </Button>
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
              />
            </GoogleOAuthProvider>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignUp };
