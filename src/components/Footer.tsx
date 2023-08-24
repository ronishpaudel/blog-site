import React, { FC } from "react";
import { useSnapshot } from "valtio";
import { FOOTER_COLOR_PALETTE, footerPageStore } from "@/store/footerPageStore";
import { TEXT_COLOR_PALETTE, textStore } from "@/store/textColor";
import {
  SEARCH_COLOR_PALETTE,
  searchInputStore,
} from "@/store/searchInputStore";
import { COLOR_PALETTE, colorPaletteStore } from "@/store/colorPalette.store";

const Footer: FC = () => {
  const colorFooterPaletteSnap = useSnapshot(footerPageStore);
  const colorTextPaletteSnap = useSnapshot(textStore);
  const colorSearchPaletteSnap = useSnapshot(searchInputStore);
  const colorPaletteSnap = useSnapshot(colorPaletteStore);
  return (
    <>
      <footer
        style={{
          backgroundColor:
            FOOTER_COLOR_PALETTE[colorFooterPaletteSnap.footerColor],
        }}
      >
        <div
          className="footer-content"
          id="footer"
          style={{
            color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
          }}
        >
          <div className="footer-info">
            <div className="About">
              <h1>About</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
            <div>
              <p>Email : info@gmai.com</p>
              <p>Phone no. : 092712688</p>
            </div>
          </div>
          <div className="link">
            <div className="quick-link">
              <p className="bolder">Quick Link</p>
              <div className="link-list">
                <p>Home</p>
                <p>About</p>
                <p>Blog</p>
                <p>Archived</p>
                <p>Author </p>
                <p>Contact</p>
              </div>
            </div>
            <div className="footer-category">
              <p className="bolder"> Category</p>

              <div className="category-list">
                <p>Lifestyle</p>
                <p>Technology</p>
                <p>Business</p>
                <p>Travel</p>
                <p>Economy </p>
                <p>Sports</p>
              </div>
            </div>
          </div>
          <div
            className="m-newsletter"
            style={{
              backgroundColor:
                SEARCH_COLOR_PALETTE[colorSearchPaletteSnap.SearchColor],
            }}
          >
            <div className="news-heading">
              <h4
                style={{
                  color: TEXT_COLOR_PALETTE[colorTextPaletteSnap.textColor],
                }}
              >
                Weekly Newsletter
              </h4>
              <p style={{ color: "#97989F" }}>
                Get blog articles and offers via email
              </p>
            </div>
            <div
              className="news-search"
              style={{
                backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
              }}
            >
              <input
                placeholder="Your Email"
                style={{
                  backgroundColor: COLOR_PALETTE[colorPaletteSnap.color],
                }}
              />
              <img src="/mail.png" alt="photo" />
            </div>

            <button className="news-btn">Subscribe</button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
