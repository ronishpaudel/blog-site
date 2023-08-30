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
import { modalStore } from "@/store/modalStore";

function SignIn({ onClick }: { onClick?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useSignInMutation({
    onSuccess: async (res: { token: string }) => {
      saveItemToLocalStorage("auth", res.token);
      authStore.setLoggedIn();
      window.location.reload();
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
    console.log({ signInModal });
  }

  const themeSnap = useSnapshot(themeStore);
  const { signInModal } = useSnapshot(modalStore);

  return (
    <div>
      <SignUp />
      <Dialog open={signInModal.open}>
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
              Enter your username or email address
            </span>
            <Input
              className="max-w-md mt-2.5 border-gray-400 h-12"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
            />
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-8"
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

            <div className="w-full grid grid-cols-2 gap-4 mt-2">
              <Button variant={"outline"}>
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant={"outline"}>
                <AiFillGithub className="mr-2 h-4 w-4" />
                Github
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignIn };
