'use strict';

import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useState, useEffect } from "react";
import {Card} from "react-bootstrap";
import { fetchNftsOf } from "../api/UserCaver";
import React from "react";
import { addressW, balanceW } from "./WalletModal/WalletModal";
import VideoPage from "./VideoPage";
import axios from "axios";
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Modal, ModalTitle, Row } from "react-bootstrap";
import VideoImageThumbnail from "react-video-thumbnail-image";

function MyBuyVideo( buyVideo ) {
  const navigate = useNavigate();
  console.log("mybuyVideo!!!!!!!!!!!", buyVideo);
  return (
    <div
       class="video"
        onClick={() => navigate("/video", {
          state: {
            title: buyVideo.buyVideo.title,
            description: buyVideo.buyVideo.description,
            url: buyVideo.buyVideo.url,
            creator_nick: buyVideo.buyVideo.userNick,
          },
        })}
      >
      <VideoImageThumbnail
        videoUrl={buyVideo.buyVideo.url}
        width={220}
        height={300}
        borderRadius={7}
        thumbnailHandler={(thumbnail) => console.log(thumbnail)}
        alt={buyVideo.buyVideo.title}
      />
    </div>
  )
}

function MyAssetPage() {
  const [buyVideo, setBuyVideo] = useState([]);

  useEffect(async()=>{
    const nick = localStorage.getItem("nick");
    const charToUni = (char)=>{
      var uni_code = ""
      for(var i=0; i<char.length;i++){
        uni_code += '\\'+char[i].charCodeAt(0).toString(16);
      };
      return uni_code
    }
    console.log("닉네임!!!!!!!", charToUni(nick));

    // const buyVideoResult = await axios.get("http://localhost:8000/video/get_buying_art",{
    const buyVideoResult = await axios.get("http://3.39.32.4:8000/video/get_buying_art",{
      headers:{
          nick : charToUni(nick),
        }
    })
    console.log("data!!!!", buyVideoResult.data);
    setBuyVideo(buyVideoResult.data);

    // navigate("/");

  },[]);  
  console.log("result가 들어왔어요~~~~~~~~",buyVideo);

  return (
    <div class = "page">
      <LoginNavigationBar />
      <div class="Cbody">
          <h4 className="Text2">내 작품</h4>
    <div>
    {buyVideo?.map(
        buyVideo => (<MyBuyVideo buyVideo={buyVideo} key={buyVideo.id}/>))}

    </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Auth(MyAssetPage, true);