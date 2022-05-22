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

function MyAssetPage() {

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

    // const result = await axios.get("http://localhost:8000/video/get_buying_art",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_buying_art",{
      headers:{
          nick : charToUni(nick),
        }
    })

    console.log("result가 들어왔어요~~~~~~~~",result);
    // navigate("/");

  },[]);  

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class = "Cbody">
        <h1 class="Text2" >내 작품</h1>
        <div className="container" style={{ padding: 0, width: "100%" }} >
              
            </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Auth(MyAssetPage, true);
