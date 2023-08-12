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

// const val =
//   typeof window === "undefined"
//     ? JSON.stringify({ token: "" })
//     : localStorage.getItem("auth") || "{}";

// export const tokenStore = proxy<{ token: string }>(
//   JSON.parse(val) || {
//     token: "",
//   }
// );

// subscribe(tokenStore, () => {
//   localStorage.setItem("auth", JSON.stringify(tokenStore));
// });

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
