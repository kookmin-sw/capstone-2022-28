import NavigationBar from "../components/Navbar/NavigationBar";
import axios from "axios";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import "./page.css";
import VideoImageThumbnail from "react-video-thumbnail-image";
import "../components/VideoDetail/VideoDetail.css";
import logo from "../components/Image/logo.png";

function LandingPage() {
  const nft_src = `https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/1080p.mp4`;
  let overView =
    " 방구석전시회는 공간의 제약없이 사용자가 자신의 창작물들을 통해 자신만의 영상전시회를 기획하고, 집에서 다양한 매체들을 사용하여 영상전시회들을 생생하게 감상할 수 있는 플랫폼입니다.";
  const nftTitle = "도심 속에서 나를 찾다.";
  let isMember = localStorage.getItem("isMember");
  console.log("landing", isMember);
  const [loginModal, setLoginModal] = useState(false);
  // 로그인됨
  if (isMember) {
    console.log("login");
    return (
      <div>
        <LoginNavigationBar />
        <div
          class="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="detailPage__background">
            <div className="detailPage__overlay"></div>
            <img src="https://cdn.pixabay.com/photo/2018/02/04/09/09/brushes-3129361_1280.jpg" />
          </div>
          <div className="detailPage__info">
            <div className="detailPage__container">
              <img style={{ width: 300 }} src={logo} />
            </div>
            <div className="detailPage__description">
              <br />
              <p>{overView}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // 로그인 안됨
  else {
    console.log("Not login");
    return (
      <div>
        <NavigationBar />
        <div
          class="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="detailPage__background">
            <div className="detailPage__overlay"></div>
            <img src="https://cdn.pixabay.com/photo/2018/02/04/09/09/brushes-3129361_1280.jpg" />
          </div>
          <div className="detailPage__info">
            <div className="detailPage__container">
              <img
                style={{ width: 300 }}
                src="https://ipfs.io/ipfs/QmQHuVDZBFJq2cmEqfPfm35foe2GR4g9JaCRqA281bDgDp?filename=exhibit.png"
              />
            </div>
            <div className="detailPage__description">
              <br />
              <p>{overView}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth(LandingPage, null);
