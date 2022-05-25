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
  return (
    <span>
      <div
       class="video"
        onClick={() => navigate("/video", {
          state: {
            title: buyVideo.title,
            description: buyVideo.description,
            url: buyVideo.url,
            creator_nick: buyVideo.userNick,
          },
        })}
      >
      <VideoImageThumbnail
        videoUrl={buyVideo.url}
        width={220}
        height={308}
        borderRadius={7}
        thumbnailHandler={(thumbnail) => console.log(thumbnail)}
        alt={buyVideo.title}
      />
      </div>
    </span>
  )
}

function MyAssetPage() {
  const [buyVideo, setBuyVideo] = useState([]);


  // const [nfts, setNfts] = useState([]);

  //   // fetchMyNFT
  // const fetchMyNFTs = async () => {
  //   const _nfts = await fetchNftsOf("0x0d516f32c3a488955c37648A139Ad1E3DBAfa7ad");
  //   setNfts(_nfts);
  //   alert(_nfts[0].uri);
  // };

  useEffect(async()=>{
    const nick = localStorage.getItem("nick");
    const charToUni = (char)=>{
      var uni_code = ""
      for(var i=0; i<char.length;i++){
        uni_code += '\\'+char[i].charCodeAt(0).toString(16);
      };
      return uni_code
    }
    console.log(charToUni(nick));

    // const buyVideoResult = await axios.get("http://localhost:8000/video/get_buying_art",{
    const buyVideoResult = await axios.get("http://3.39.32.4:8000/video/get_buying_art",{
      headers:{
          nick : charToUni(nick),
        }
    })
    setBuyVideo(buyVideoResult.data);

    console.log("result가 들어왔어요~~~~~~~~",buyVideo);
    // navigate("/");

  },[]);  

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class = "Cbody">
        <h1 class="Text2" >내 작품</h1>
        {buyVideo.map(
        buyVideo => (<MyBuyVideo buyVideo={buyVideo} key={buyVideo.id}/>
      ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Auth(MyAssetPage, true);
