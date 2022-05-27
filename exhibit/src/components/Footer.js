import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div class="footer">
      <div className="footer-container">
        <section className="footer-subscription">
          <p className="footer-subscription-heading">방구석 전시회</p>
          <p className="footer-subscription-text">
            민대인 김하연 노성환 최지희 이도원
          </p>
        </section>

        <section className="social-media">
          <div className="social-media-wrap">
            <Link to="/" className="social-logo">
              Bang Gu Seock Exhibition
            </Link>

            <small className="website-rights">https://www.kookmin.ac.kr</small>
            <small className="website-rights">
              {" "}
              문의 @hayoun28@kookmin.ac.kr
            </small>

            <div className="social-icons">
              <a
                href="https://www.youtube.com/watch?v=-PSzisHSG6g"
                class="social-icon-link youtube"
                target="_blank"
                aria-label="Youtube"
              >
                <i class="fab fa-youtube" />
              </a>
              <a
                href="https://github.com/kookmin-sw/capstone-2022-28"
                class="social-icon-link github"
                target="_blank"
                aria-label="Github"
              >
                <i class="fab fa-github" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
