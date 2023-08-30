import { proxy } from "valtio";

interface IModalStore {
  signUpModal: {
    open: boolean;
    setOpen: (val: boolean) => void;
  };
  signInModal: {
    open: boolean;
    setOpen: (val: boolean) => void;
  };
  logout: {
    open: boolean;
    setOpen: (val: boolean) => void;
  };
}
export const modalStore = proxy<IModalStore>({
  signUpModal: {
    open: false,
    setOpen(val) {
      this.open = val;
    },
  },
  signInModal: {
    open: false,
    setOpen(val) {
      this.open = val;
    },
  },
  logout: {
    open: false,
    setOpen(val) {
      this.open = val;
    },
  },
});
