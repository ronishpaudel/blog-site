import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { modalStore } from "@/store/modalStore";
import { Input } from "./ui/input";
import { useResetPw } from "@/hooks/useResetPw";

const ForgotPassword = () => {
  const themeSnap = useSnapshot(themeStore);
  const { forgotPassword } = useSnapshot(modalStore);
  const [email, setEmail] = useState("");
  const { mutate } = useResetPw({
    onSuccess: async (res: { token: string }) => {},
  });
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }
  function handleOnClick() {
    modalStore.forgotPassword.setOpen(false);
  }

  return (
    <div>
      <Dialog open={forgotPassword.open}>
        <DialogContent>
          <div className="flex items-center justify-between  ">
            <div>
              <h1
                className="text-5xl"
                style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              >
                Forgot your password?
              </h1>
            </div>
            <div>
              <p className="w-24 text-gray-500">Remember password? </p>
              <div
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                onClick={handleOnClick}
              >
                Sign in
              </div>
            </div>
          </div>
          <span
            style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
            className="mt-10"
          >
            Enter your email account
          </span>
          <Input
            className="max-w-md border-gray-400 h-12"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="mt-10 mb-10">
            <Button variant={"blue"} onClick={() => mutate({ email })}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPassword;
