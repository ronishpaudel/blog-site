import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { Meta } from "../../public";
import { Button } from "./ui/button";
import { blogCreationStore } from "@/store/blogCreationStore";
import { modalStore } from "@/store/modalStore";
import { Logout } from "./Logout";
import { BsSearch } from "react-icons/bs";
import { headers } from "next/dist/client/components/headers";

function setThemePreference(theme: string) {
  localStorage.setItem("themePreference", theme);
}

const Header: FC = () => {
  const { push, pathname } = useRouter();
  const { loggedIn } = useSnapshot(authStore);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const themeSnap = useSnapshot(themeStore);
  const { query } = useSnapshot(blogCreationStore);

  useEffect(() => {
    const storedTheme = localStorage.getItem("themePreference");
    if (storedTheme === "dark") {
      themeStore.setTheme("dark");
      setIsLightMode(false);
    }
  }, []);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleLogin() {
    modalStore.signInModal.setOpen(true);
    console.log({ loggedIn });
  }

  function handleLogout() {
    authStore.setLogOut();
    localStorage.removeItem("auth");
    setShowLogoutConfirmation(false);
  }
  const handleLogoutConfirmation = () => {
    modalStore.logout.setOpen(true);
    setShowLogoutConfirmation(true);
  };

  function handlePush() {
    const token = localStorage.getItem("auth");
    if (token) {
      push("/create-blog");
    } else {
      modalStore.signInModal.setOpen(true);
    }
  }

  function handleOnClick() {
    if (isLightMode) {
      themeStore.setTheme("dark");
      setThemePreference("dark");
    } else {
      themeStore.setTheme("light");
      setThemePreference("light");
    }
  }

  async function handleSearch(e: any) {
    blogCreationStore.setQuery(e.target.value);
  }

  function onPush() {
    push("/");
    blogCreationStore.setQuery("");
  }

  return (
    <>
      <header
        style={{ backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg }}
      >
        <div className="header">
          <div className="header-logo" onClick={onPush}>
            {isLightMode ? <img src="/logo.png" alt="asd" /> : <Meta />}
          </div>

          <div className="lastchildheaderparent">
            {pathname !== "/create-blog" && pathname !== "/recheck-blog" && (
              <>
                <div
                  className={`header-items ${isMenuOpen ? "menu-open" : ""} `}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                    color: THEME_PALETTE[themeSnap.theme].textColor,
                    border: "none",
                  }}
                >
                  <div
                    className="blogs-create "
                    onClick={handlePush}
                    style={{
                      backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                      color: THEME_PALETTE[themeSnap.theme].textColor,
                      border: "none",
                    }}
                  >
                    Create Blogs
                    <AiOutlinePlus
                      style={{ fontSize: "15px" }}
                      className="search-png"
                    />
                  </div>
                </div>

                <div
                  className="header-search"
                  style={{
                    backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="rounded-lg"
                    value={query}
                    style={{
                      backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                      color: THEME_PALETTE[themeSnap.theme].textColor,
                    }}
                    onChange={handleSearch}
                  />
                  <img
                    src="/search-outline.png"
                    className="search-png"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </>
            )}
            {/* <div
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
                  handleOnClick();
                }
              }}
            >
              <div className="golo">
                <img src="/sunny.png" />
              </div>
            </div> */}
            {pathname !== "/create-blog" && pathname !== "/recheck-blog" && (
              <div className="lgnin-lgnout-btn">
                <div
                  className={`header-items-btn ${
                    isMenuOpen ? "menu-open" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {loggedIn ? (
                    <>
                      <Button
                        onClick={handleLogoutConfirmation}
                        className="max-w-md w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                      >
                        Logout
                      </Button>
                      {showLogoutConfirmation && (
                        <Logout onLogout={handleLogout} />
                      )}
                    </>
                  ) : (
                    <Button variant={"blue"} onClick={handleLogin}>
                      Login
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <button className="search-logo-btn mr-4" onClick={handleToggleSearch}>
          <BsSearch
            style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
          />
        </button> */}
        <button
          className="menu-button"
          onClick={handleToggleMenu}
          style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
        >
          Menu
        </button>
      </header>
    </>
  );
};

export default Header;
