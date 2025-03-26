import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import { blogCreationStore } from "@/store/blogCreationStore";
import { modalStore } from "@/store/modalStore";
import { Logout } from "./Logout";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from "./ui/input";
import Link from "next/link";

const Header: FC = () => {
  const { push, pathname } = useRouter();
  const { loggedIn } = useSnapshot(authStore);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const themeSnap = useSnapshot(themeStore);
  const { query } = useSnapshot(blogCreationStore);
  const [searchLogo, setSearchLogo] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Theme and local storage management
  useEffect(() => {
    const storedTheme = localStorage.getItem("themePreference");
    if (storedTheme === "dark") {
      themeStore.setTheme("dark");
    }
  }, []);

  // Toggle mobile menu
  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  // Login handler
  async function handleLogin() {
    modalStore.signInModal.setOpen(true);
  }

  // Logout handler
  function handleLogout() {
    authStore.setLogOut();
    localStorage.removeItem("auth");
    setShowLogoutConfirmation(false);
    push("/"); // Redirect to home after logout
  }

  // Logout confirmation handler
  const handleLogoutConfirmation = () => {
    modalStore.logout.setOpen(true);
    setShowLogoutConfirmation(true);
  };

  // Create blog navigation handler
  function handlePush() {
    const token = localStorage.getItem("auth");
    if (token) {
      push("/create-blog");
    } else {
      modalStore.signInModal.setOpen(true);
    }
  }

  // Search-related handlers
  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    blogCreationStore.setQuery(e.target.value);
    setSearchLogo(!!e.target.value);
  }

  function handleCrossClick() {
    blogCreationStore.setQuery("");
    setSearchLogo(false);
  }

  function onClickSearchBar() {
    setShowSearchBar(true);
  }

  function onPush() {
    push("/");
    setSearchLogo(false);
    blogCreationStore.setQuery("");
  }

  // Determine whether to show certain header items
  const hideItems =
    pathname !== "/create-blog" &&
    pathname !== "/recheck-blog" &&
    pathname !== "/auth/reset-password" &&
    pathname !== "/[id]" &&
    pathname !== "/myBlogs";

  // Theme-based color and style generator
  const getThemedStyle = (baseStyle: React.CSSProperties = {}) => ({
    ...baseStyle,
    backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
    color: THEME_PALETTE[themeSnap.theme].textColor,
  });

  return (
    <header
      style={getThemedStyle()}
      className="fixed top-0 left-0 w-full z-50 shadow-md"
    >
      {showSearchBar ? (
        <div className="py-4 flex gap-5 items-center max-w-[768px] w-full justify-center mx-auto">
          <div className="flex justify-center items-center relative max-w-[495px] w-full">
            <Input
              className="rounded-lg w-full pl-4 pr-10"
              type="text"
              placeholder="Search blogs..."
              value={query}
              style={{
                backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                color: THEME_PALETTE[themeSnap.theme].textColor,
                borderColor: THEME_PALETTE[themeSnap.theme].baseColor,
              }}
              onChange={handleSearch}
            />
            {query && (
              <RxCross2
                style={{
                  color: THEME_PALETTE[themeSnap.theme].baseColor,
                }}
                className="cursor-pointer text-xl absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={handleCrossClick}
              />
            )}
          </div>
          <div
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowSearchBar(false)}
          >
            Cancel
          </div>
        </div>
      ) : (
        <div className="header py-3 flex justify-between items-center max-w-[768px] w-full mx-auto px-4">
          {/* Logo */}
          <div className="header-logo cursor-pointer" onClick={onPush}>
            <h2 className="text-[26px] text-white tracking-tighter font-bold">
              PaudelDada
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {hideItems && (
              <>
                {loggedIn && (
                  <button
                    onClick={() => push("/myBlogs")}
                    className="text-gray-300 hover:text-white transition-colors duration-300 mr-4"
                  >
                    My Blogs
                  </button>
                )}

                {/* Create Blog Button */}
                <button
                  onClick={handlePush}
                  className="flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
                    color: THEME_PALETTE[themeSnap.theme].textColor,
                    border: `1px solid ${
                      THEME_PALETTE[themeSnap.theme].baseColor
                    }`,
                    minWidth: "120px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Create
                  <AiOutlinePlus
                    style={{ fontSize: "15px", marginLeft: "8px" }}
                  />
                </button>

                {/* Login/Logout Button */}
                {loggedIn ? (
                  <button
                    onClick={handleLogoutConfirmation}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out"
                    style={{
                      backgroundColor: "#FF6B6B",
                      color: "white",
                      minWidth: "120px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out"
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      minWidth: "120px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Login
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="search-logo-btn mr-2" onClick={onClickSearchBar}>
              <BsSearch
                style={{
                  color: THEME_PALETTE[themeSnap.theme].textColor,
                }}
                className="text-xl"
              />
            </div>
            <div className="menu-button text-white" onClick={handleToggleMenu}>
              {isMenuOpen ? "Close" : "Menu"}
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute top-full right-0 w-full bg-gray-800 shadow-lg"
                style={{
                  backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
                }}
              >
                <div className="px-4 py-4 space-y-2">
                  {loggedIn && (
                    <Link
                      href="/myBlogs"
                      className="block text-white py-2 hover:bg-gray-700"
                    >
                      My Blogs
                    </Link>
                  )}
                  <div
                    onClick={handlePush}
                    className="block text-white py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    Create Blog
                  </div>
                  {loggedIn ? (
                    <div
                      onClick={handleLogoutConfirmation}
                      className="block text-white py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Logout
                    </div>
                  ) : (
                    <div
                      onClick={handleLogin}
                      className="block text-white py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Login
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout Confirmation Modal */}
          {showLogoutConfirmation && <Logout onLogout={handleLogout} />}
        </div>
      )}
    </header>
  );
};

export default Header;
