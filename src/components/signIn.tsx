import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSignInMutation } from "@/hooks/useSigninMutation";
import { saveItemToLocalStorage } from "@/store/storage";
import { authStore } from "@/store/authStore";
import { useState } from "react";
import { SignUp } from "./signUp";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { useSnapshot } from "valtio";

function SignIn({ onClick }: { onClick: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const { mutate } = useSignInMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);
      authStore.setLoggedIn();
    },
  });

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  function handleShowSignUp() {
    setShowSignUp(true);
  }
  const themeSnap = useSnapshot(themeStore);

  return (
    <div>
      {showSignUp ? (
        <SignUp />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="max-w-md w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
              onClick={onClick}
            >
              login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
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
                    Sign in
                  </h1>
                </div>
                <div>
                  <p className="w-24 text-gray-500">No Account ? </p>
                  <p
                    className="text-blue-500 cursor-pointer hover:text-blue-600"
                    onClick={handleShowSignUp}
                  >
                    Sign up
                  </p>
                  {showSignUp && <SignUp />}
                </div>
              </div>
              <DialogTitle>
                <span
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Enter your username or email address
                </span>
                <Input
                  className="max-w-md mt-2.5 border-gray-400 h-12"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ color: THEME_PALETTE[themeSnap.theme].inputBg }}
                />
              </DialogTitle>
              <DialogDescription>
                <span
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Enter your Password
                </span>
                <Input
                  className="max-w-md mt-1 border-gray-400 h-12"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className="text-base max-w-md mt-1.5 text-blue-500 cursor-pointer hover:text-blue-600 flex justify-end ">
                  Forgot password?
                </span>
                <div className="mt-10 mb-10">
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

                <div className="grid grid-cols-2 gap-4 m-3">
                  <Button>
                    <FcGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button>
                    <AiFillGithub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
export { SignIn };
