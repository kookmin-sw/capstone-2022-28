import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useState } from "react";
import {Card} from "react-bootstrap";
import { fetchNftsOf } from "../api/UserCaver";
import React from "react";
import { addressW, balanceW } from "./WalletModal/WalletModal";
import VideoPage from "./VideoPage";


function MyAssetPage() {

  const [nfts, setNfts] = useState([]);

    // fetchMyNFT
  const fetchMyNFTs = async () => {
    const _nfts = await fetchNftsOf(addressW);
    setNfts(_nfts);
  };

  fetchMyNFTs();

  return (
    <div>
      <LoginNavigationBar />
      <div class = "page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 class="title">내 작품</h1>
        <div className="container" style={{ padding: 0, width: "100%" }}>
              {nfts.map((nft, index) => {
                <Card.Img
                  onClick={() => {
                    VideoPage(nft.uri);
                  }}
                  className="img-responsive"
                  src={nfts[index].uri}
                />;
              })}
            </div>
      </div>
    </div>
  );
}

export default Auth(MyAssetPage, true);
