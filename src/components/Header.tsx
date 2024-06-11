import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { Button } from "./ui/button";
import { blogCreationStore } from "@/store/blogCreationStore";
import { modalStore } from "@/store/modalStore";
import { Logout } from "./Logout";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from "./ui/input";

// function setThemePreference(theme: string) {
//   localStorage.setItem("themePreference", theme);
// }

const Header: FC = () => {
  const { push, pathname } = useRouter();
  const { loggedIn } = useSnapshot(authStore);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const themeSnap = useSnapshot(themeStore);
  const { query } = useSnapshot(blogCreationStore);
  const [searchLogo, setSearchLogo] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  function onClickSearchBar() {
    setShowSearchBar(true);
  }

  async function handleSearch(e: any) {
    blogCreationStore.setQuery(e.target.value);
    if (e.target.value) {
      setSearchLogo(true);
    }
  }

  async function handleCrossClick(e: any) {
    blogCreationStore.setQuery("");
    setSearchLogo(false);
  }

  function onPush() {
    push("/");
    setSearchLogo(false);
    blogCreationStore.setQuery("");
  }

  const hideItems =
    pathname !== "/create-blog" &&
    pathname !== "/recheck-blog" &&
    pathname !== "/auth/reset-password" &&
    pathname !== "/[id]" &&
    pathname !== "/myBlogs";

  return (
    <>
      <header
        style={{ backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg }}
      >
        {showSearchBar ? (
          <div className="py-4 flex gap-5 items-center max-w-[768px] w-full justify-center">
            <div className="flex justify-center items-center relative max-w-[495px] w-full">
              <Input
                className="rounded-lg w-full "
                type="text"
                placeholder="Search"
                value={query}
                style={{
                  backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
                onChange={handleSearch}
              />
              <RxCross2
                style={{
                  color: THEME_PALETTE[themeSnap.theme].baseColor,
                }}
                className="cursor-pointer text-xl absolute top-1/2 right-4 transform -translate-y-1/2 "
                onClick={handleCrossClick}
              />
            </div>
            <div
              className="text-gray-100"
              onClick={() => setShowSearchBar(false)}
            >
              Cancel
            </div>
          </div>
        ) : (
          <div className="header">
            <div className="header-logo" onClick={onPush}>
              <img src="/techEra/techera-gray.png" alt="asd" />
            </div>
            <div className="lastchildheaderparent">
              {hideItems && (
                <>
                  {loggedIn && (
                    <div
                      className="text-gray-500 text-[16px] hover:scale-105 cursor-pointer md:block hidden  "
                      onClick={() => push("/myBlogs")}
                    >
                      MyBlogs
                    </div>
                  )}
                </>
              )}

              {hideItems && (
                <div
                  className={`header-items`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: THEME_PALETTE[themeSnap.theme].textColor,
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
                    Create
                    <AiOutlinePlus
                      style={{ fontSize: "15px" }}
                      className="search-png"
                    />
                  </div>

                  <div className="lgnin-lgnout-btn">
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

            <div className="md:hidden block">
              <div className="flex items-center">
                <div
                  className="search-logo-btn mr-4"
                  onClick={onClickSearchBar}
                >
                  <BsSearch
                    style={{
                      color: THEME_PALETTE[themeSnap.theme].textColor,
                    }}
                  />
                </div>
                <div
                  className="menu-button"
                  onClick={handleToggleMenu}
                  style={{ color: THEME_PALETTE[themeSnap.theme].textColor }}
                >
                  Menu
                </div>
                {isMenuOpen && (
                  <div
                    style={{
                      backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
                    }}
                    className="absolute mt-2 max-w-[768px] top-[66%] right-[1%] bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <a
                        href="/myBlogs"
                        className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-300"
                      >
                        My Crafted Blogs
                      </a>
                      <a
                        href="/create-blog"
                        className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-300"
                      >
                        Start crafting
                      </a>
                      <a
                        href="https://techera.io"
                        className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100"
                      >
                        Support
                      </a>
                      <div
                        className="block w-full px-4 py-2 text-left text-sm text-gray-100 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <div>
                          {loggedIn ? (
                            <>
                              <button onClick={handleLogoutConfirmation}>
                                Sign out
                              </button>
                              {showLogoutConfirmation && (
                                <Logout onLogout={handleLogout} />
                              )}
                            </>
                          ) : (
                            <button onClick={handleLogin}>Sign in</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
