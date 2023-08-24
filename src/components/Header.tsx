import React, { FC, useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { blogCreationStore } from "@/store/blogCreationStore";
import Logout from "./Logout";
import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";
import { footerPageStore } from "@/store/footerPageStore";
import { Meta } from "../../public";
import {
  SEARCH_COLOR_PALETTE,
  searchInputStore,
} from "@/store/searchInputStore";
import { TEXT_COLOR_PALETTE, textStore } from "@/store/textColor";

const Header: FC = () => {
  const { push } = useRouter();
  const { loggedIn } = useSnapshot(authStore);
  const [isLightMode, setIsLightMode] = useState(true);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  blogCreationStore.setQuery(debouncedSearchQuery);
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  const colorFooterPaletteSnap = useSnapshot(footerPageStore);
  const colorSearchPaletteSnap = useSnapshot(searchInputStore);
  const colorTextPaletteSnap = useSnapshot(textStore);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  async function handleLogin() {
    await push("/auth");
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
  return (
    <>
      <header
        style={{
          backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
        }}
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
                    backgroundColor:
                      SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
                    color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
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
                backgroundColor:
                  SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                style={{
                  backgroundColor:
                    SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

                colorPaletteStore.setColor("black");
                colorFooterPaletteSnap.setFooterColor("black");
                colorSearchPaletteSnap.setSearchColor("black");
                colorTextPaletteSnap.setTextColor("white");
              }}
            >
              <div className="golo">
                <img src="/sunny.png" />
              </div>
            </div>
            <div className="lgnin-lgnout-btn">
              {loggedIn ? (
                <>
                  <Button text="Logout" onClick={handleLogoutConfirmation} />
                  {showLogoutConfirmation && (
                    <Logout
                      onLogout={handleLogout}
                      onCancel={handleCancelLogout}
                    />
                  )}
                </>
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
