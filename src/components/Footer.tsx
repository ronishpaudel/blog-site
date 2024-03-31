import React, { FC } from "react";
import { useSnapshot } from "valtio";
import { THEME_PALETTE, themeStore } from "@/store/colorPalette.store";
import Link from "next/link";

const Footer: FC = () => {
  const themeSnap = useSnapshot(themeStore);
  return (
    <>
      <footer
        style={{
          backgroundColor: THEME_PALETTE[themeSnap.theme].footerBg,
        }}
      >
        <div
          className="footer-content"
          id="footer"
          style={{
            color: THEME_PALETTE[themeSnap.theme].textColor,
          }}
        >
          <div className="footer-info">
            <div className="About">
              <h3>About</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="mailto:paudelronish@gmail.com">
                Email : paudelronish@gmail.com
              </Link>
              <Link href="tel:9840268759" className="cursor-pointer">
                Phone no. : 9840268759
              </Link>
            </div>
          </div>
          <div className="link">
            <div className="quick-link">
              <p className="bolder">Quick Link</p>
              <div className="link-list cursor-pointer">
                <Link href="/">Home</Link>
                <Link href="#footer">About</Link>
                <Link href="#main">Blog</Link>

                <Link href="#footer">Author </Link>
                <Link href="mailto:paudelronish@gmail.com">Contact</Link>
              </div>
            </div>
            <div className="footer-category">
              <p className="bolder"> Category</p>

              <div className="category-list">
                <Link
                  href="https://www.bloggingherway.com/what-is-a-lifestyle-blog/"
                  target="_blank"
                >
                  Lifestyle
                </Link>
                <Link
                  href="https://bloggingguide.com/best-tech-blog-examples/"
                  target="_blank"
                >
                  Technology
                </Link>
                <Link
                  target="_blank"
                  href="https://uk.indeed.com/career-advice/career-development/what-is-a-business-blog"
                >
                  Business
                </Link>
                <Link
                  target="_blank"
                  href="https://arrivalshall.com/2018/03/14/what-is-a-travel-blog/"
                >
                  Travel
                </Link>
                <Link
                  target="_blank"
                  href="https://www.intelligenteconomist.com/economics-blogs/"
                >
                  Economy
                </Link>
                <Link target="_blank" href="https://detailed.com/sports-blogs/">
                  Sports
                </Link>
              </div>
            </div>
          </div>
          <div
            className="m-newsletter"
            style={{
              backgroundColor: THEME_PALETTE[themeSnap.theme].inputBg,
            }}
          >
            <div className="news-heading">
              <h4
                style={{
                  color: THEME_PALETTE[themeSnap.theme].textColor,
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
                backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
              }}
            >
              <input
                placeholder="Your Email"
                style={{
                  backgroundColor: THEME_PALETTE[themeSnap.theme].cardBg,
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
