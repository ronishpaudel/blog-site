import { IUser } from "@/types/user";

import { proxy } from "valtio";

interface IAuthStore {
  loggedIn: boolean;
  dbUser: IUser | null;
  tokenFetching: boolean;
  setLoggedIn: () => void;
  setLogOut: () => void;
  setDbUser: (user: IUser | null) => void;
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
