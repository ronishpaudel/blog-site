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

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            className="
            max-w-md
            w-10
            px-1
            text-center
            text-white
            bg-blue-500
            hover:bg-blue-600
            cursor-pointer"
            onClick={onClick}
          >
            login
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-between  ">
              <div>
                <h1 className="text-black text-xl">Welcome to Lorem</h1>
                <h1 className="text-5xl">Sign in</h1>
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
              <span>Enter your username or email address</span>
              <Input
                className="max-w-md mt-2.5 border-gray-400 h-12"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </DialogTitle>
            <DialogDescription>
              <span>Enter your Password</span>
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
                  onClick={() =>
                    mutate({
                      email,
                      password,
                    })
                  }
                  className="max-w-md w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                  Sign in
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { SignIn };
