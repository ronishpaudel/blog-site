import { TPost } from "@/types/TPost";
import { proxy } from "valtio";

interface IAuthStore {
  loggedIn: boolean;
  dbUser: TPost | null;
  tokenFetching: boolean;
  setLoggedIn: () => void;
  setLogOut: () => void;
  setDbUser: (user: TPost | null) => void;
  setTokenFetching: (fetching: boolean) => void;
}

export const authStore = proxy<IAuthStore>({
  loggedIn: false,
  dbUser: null,
  tokenFetching: true,
  setLoggedIn() {
    this.loggedIn = true;
  },
  setLogOut() {
    this.loggedIn = false;
  },
  setDbUser(user) {
    this.dbUser = user;
  },
  setTokenFetching(fetching) {
    this.tokenFetching = fetching;
  },
});
