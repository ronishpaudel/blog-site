import React, { FC, useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/authStore";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";

const Header: FC = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedIn } = useSnapshot(authStore);
  const { push } = useRouter();

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
    // setIsLoggedIn(false);
  }

  // const token =
  //   typeof window !== "undefined" ? getItemFromLocalStorage("auth") : "";
  return (
    <>
      <header>
        <div className="header">
          <div className="header-logo">
            <Link href="/">
              <img src="/logo.png" alt="asd" />
            </Link>
          </div>
          {/* <div
          // className={`header-items ${isMenuOpen ? "menu-open" : ""}`}
          // onClick={() => setIsMenuOpen(false)}
          >
            <p>
              <Link href="/create-blog" className="blogsCreate">
                Craft, Share, Empower
                <AiOutlinePlus style={{ fontSize: "20px" }} />
              </Link>
            </p>
          </div> */}
          <div className="lastchildheaderparent">
            <div>
              <p>
                <Link href="/create-blog" className="blogsCreate">
                  Craft, Blogs
                  <AiOutlinePlus style={{ fontSize: "15px" }} />
                </Link>
              </p>
            </div>
            <div className="header-search">
              <input type="text" placeholder="Search" />
              <img src="/search-outline.png" className="search-png" />
            </div>
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
                }
              }}
            >
              <div className="golo">
                <img src="/sunny.png" />
              </div>
            </div> */}
            <div className="lgnin-lgnout-btn">
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
