//@ts-nocheck
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { modalStore } from "@/store/modalStore";

interface Ilogout {
  onLogout: () => void;
}

function Logout({ onLogout }: Ilogout) {
  const themeSnap = useSnapshot(themeStore);
  const { logout } = useSnapshot(modalStore);

  return (
    <div>
      <Dialog open={logout.open}>
        <DialogContent onCloseClick={() => modalStore.logout.setOpen(false)}>
          <div className="flex flex-col gap-2 mb-2">
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-5 text-center  text-2xl mb-4"
            >
              Are you sure you want to sign out ?
            </span>
            <div className="flex gap-12 mt-4 justify-center">
              <Button variant={"destructive"} onClick={onLogout} className="">
                Yes , Sign out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { Logout };
