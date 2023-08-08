import React, { FC, useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { PublicRoute } from "./hoc/PublicRoute";

const Header: FC = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedIn } = useSnapshot(authStore);

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwtToken");
  //   if (jwtToken) {
  //     authStore.setLoggedIn();
  //   } else {
  //     authStore.setLogOut();
  //   }
  // }, []);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwtToken");
  //   setIsLoggedIn(!!jwtToken);
  // }, []);

  const { push } = useRouter();

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleLogin() {
    await push("/auth");

    // setIsLoggedIn(true);
  }

  function handleLogout() {
    authStore.setLogOut();
    // setIsLoggedIn(false);
  }

  return (
    <>
      <header>
        <div className="header">
          <div className="header-logo">
            <img src="/logo.png" alt="asd" />
          </div>
          <div
            className={`header-items ${isMenuOpen ? "menu-open" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <p>Home</p>
            <p>Blog</p>
            <p onClick={() => push("/create-blog")}>Post blogs</p>
            <p>Pages</p>
            <p>Contacts</p>
          </div>
          <div className="lastchildheaderparent">
            <div className="header-search">
              <input type="text" placeholder="Search" />
              <img src="/search-outline.png" className="search-png" />
            </div>
            <div
              className={`header-toggle ${
                isLightMode ? "left-to-right" : "right-to-left"
              }`}
              style={!isLightMode ? { backgroundColor: "#4B6BFB" } : {}}
              onClick={() => {
                if (typeof window !== undefined && document) {
                  document
                    .querySelector(".golo")
                    ?.classList.add(
                      isLightMode
                        ? "animate-move-toggle-to-right"
                        : "animate-move-toggle-to-left"
                    );
                  document
                    .querySelector(".golo")
                    ?.classList.remove(
                      !isLightMode
                        ? "animate-move-toggle-to-right"
                        : "animate-move-toggle-to-left"
                    );
                  setIsLightMode((prevMode) => !prevMode);
                }
              }}
            >
              <div className="golo">
                <img src="/sunny.png" />
              </div>
            </div>
            <div>
              {loggedIn ? (
                <Button text="Logout" onClick={handleLogout} />
              ) : (
                <Button text="Login" onClick={handleLogin} />
              )}
            </div>
            <button className="menu-button" onClick={handleToggleMenu}>
              Menu
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
