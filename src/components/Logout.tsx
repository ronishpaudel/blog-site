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
        <DialogContent>
          <div className="flex flex-col gap-2 mb-2">
            <span
              style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
              className="mt-2 text-center text font-bold text-xs"
            >
              Are you sure you want to sign out?
            </span>
            <div className="flex gap-12 mt-5 justify-center">
              <Button variant={"destructive"} onClick={onLogout}>
                Yes,sign out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export { Logout };
