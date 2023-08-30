import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { Meta } from "../../public";
import { SignIn } from "./signIn";
import { SignUp } from "./signUp";
import { Button } from "./ui/button";
import Logout from "./Logout";

function setThemePreference(theme: string) {
  localStorage.setItem("themePreference", theme);
}

const Header: FC = () => {
  const { push } = useRouter();
  const { loggedIn } = useSnapshot(authStore);
  const [isLightMode, setIsLightMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const themeSnap = useSnapshot(themeStore);

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
    // await push("/auth");
    console.log({ loggedIn });
  }

  function handleLogout() {
    authStore.setLogOut();
    localStorage.removeItem("auth");
    setShowLogoutConfirmation(false);
  }
  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  function handlePush() {
    const token = localStorage.getItem("auth");
    if (token) {
      push("/create-blog");
    } else {
      push("/auth");
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

  return (
    <>
      <header
        style={{ backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg }}
      >
        <div className="header">
          <div className="header-logo">
            <Link href="/">
              {isLightMode ? <img src="/logo.png" alt="asd" /> : <Meta />}
            </Link>
          </div>

          <div className="lastchildheaderparent">
            <div>
              <div>
                <div
                  className="blogsCreate"
                  onClick={handlePush}
                  style={{
                    backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                    color: THEME_PALETTE[themeSnap.theme].textColor,
                    border: "none",
                  }}
                >
                  Craft, Blogs
                  <AiOutlinePlus style={{ fontSize: "15px" }} />
                </div>
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
                value={searchQuery}
                style={{
                  backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <img
                src="/search-outline.png"
                className="search-png"
                style={{ cursor: "pointer" }}
              />
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
                  handleOnClick();
                }
              }}
            >
              <div className="golo">
                <img src="/sunny.png" />
              </div>
            </div>
            <div className="lgnin-lgnout-btn">
              {loggedIn ? (
                <>
                  <Button
                    onClick={handleLogoutConfirmation}
                    className="max-w-md w-full text-center text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  >
                    logout
                  </Button>
                  {showLogoutConfirmation && (
                    <Logout
                      onLogout={handleLogout}
                      onCancel={handleCancelLogout}
                    />
                  )}
                </>
              ) : (
                <SignIn onClick={handleLogin} />
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
