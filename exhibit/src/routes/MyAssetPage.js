import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import VideoImageThumbnail from "react-video-thumbnail-image";

function MyBuyVideo(buyVideo) {
  const navigate = useNavigate();
  return (
    <span>
      <div
        onClick={() =>
          navigate("/video", {
            state: {
              title: buyVideo.buyVideo.title,
              description: buyVideo.buyVideo.description,
              url: buyVideo.buyVideo.url,
              creator_nick: buyVideo.buyVideo.userNick,
            },
          })
        }
      >
        <VideoImageThumbnail
          videoUrl={buyVideo.buyVideo.url}
          width={220}
          height={308}
          borderRadius={7}
          alt={buyVideo.buyVideo.title}
        />
      </div>
    </span>
  );
}

function MyAssetPage() {
  const [buyVideo, setBuyVideo] = useState([]);

  useEffect(async () => {
    const nick = localStorage.getItem("nick");
    const charToUni = (char) => {
      var uni_code = "";
      for (var i = 0; i < char.length; i++) {
        uni_code += "\\" + char[i].charCodeAt(0).toString(16);
      }
      return uni_code;
    };

    // const buyVideoResult = await axios.get("http://localhost:8000/video/get_buying_art",{
    const buyVideoResult = await axios.get(
      "http://3.39.32.4:8000/video/get_buying_art",
      {
        headers: {
          nick: charToUni(nick),
        },
      }
    );
    setBuyVideo(buyVideoResult.data);
    console.log(buyVideoResult);
  }, []);

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class="Cbody">
        <h1 class="Text2">내가 구매한 작품</h1>
        {buyVideo.map((buyVideo) => (
          <MyBuyVideo buyVideo={buyVideo} key={buyVideo.id} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Auth(MyAssetPage, true);
