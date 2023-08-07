import React, { FC } from "react";
import { PublicRoute } from "./hoc/PublicRoute";

const Footer: FC = () => {
  return (
    <>
      <footer>
        <div className="footer-content">
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
          <div className="m-newsletter">
            <div className="news-heading">
              <h4>Weekly Newsletter</h4>
              <p>Get blog articles and offers via email</p>
            </div>
            <div className="news-search">
              <input placeholder="Your Email" />
              <img src="/mail.png" alt="photo" />
            </div>
            <button className="news-btn">Subscribe</button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PublicRoute(Footer);
