// import NavBar from "../components/Navbar";
// import React, { useState } from "react";
// import {
//   getBalance,
//   readCount,
//   setCount,
//   fetchCardsOf,
// } from "../api/UserCaver";
// import QRCode from "qrcode.react";
// import * as KlipAPI from "../api/UserKlip";
// import * as CaverAPI from "../api/UserCaver";
// import Caver from "caver-js";
// import { Alert, Container, Card, Nav, Form, Button } from "react-bootstrap";
// import "../wallet.css";
// import { MARKET_CONTRACT_ADDRESS_MAIN } from "../constants";
// import Auth from "../hoc/auth";
// import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

// function onPressButton(balance) {
//   console.log("hi");
// }

// const onPressButton2 = (_balance, _setBalance) => {
//   _setBalance(_balance);
// };

// const DEFAULT_QR_CODE = "DEFAULT";
// const DEFAULT_ADDRESS = "0x0000000000000000000000000000000000000000";

// function MyWallet() {
//   // State Data
//   const [nfts, setNfts] = useState([]); // {Id: '101', Uri: ''}
//   const [myBalance, setMyBalance] = useState("0");
//   const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

//   // Global Data
//   // address
//   // nft

//   // UI
//   const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
//   const [tab, setTab] = useState("MINT"); // Market, Mint, Wallet
//   const [mintImageUrl, setMintImageUrl] = useState("");
//   // mintInput

//   // Modal

//   // fetch Market NFTs
//   const fetchMarketNFTs = async () => {
//     const _nfts = await fetchCardsOf(MARKET_CONTRACT_ADDRESS_MAIN);
//     setNfts(_nfts);
//   };

//   // fetchMyNFT
//   const fetchMyNFTs = async () => {
//     const _nfts = await fetchCardsOf(myAddress);
//     setNfts(_nfts);
//   };

//   // const getUserData = () => {
//   //   KlipAPI.getAddress(setQrvalue, (address) => {
//   //     setMyAddress(address);
//   //     const _balance = getBalance(address);
//   //     setMyBalance(_balance);
//   //   });
//   // };

//   const onClickgetAddress = () => {
//     KlipAPI.getAddress(setQrvalue);
//   };
//   const onClickSetCount = () => {
//     // BaoBab Network
//     CaverAPI.setCount(2000);
//     CaverAPI.readCount();

//     // Main Network
//     // KlipAPI.setCount(2000);
//   };

  

//   // onClickMint
//   const onClickMint = async (uri) => {
//     if (myAddress === DEFAULT_ADDRESS) alert(`NO Address ${uri}`);
//     const randomTokenId = parseInt(Math.random() * 10000000);
//     KlipAPI.mintCardWithURI(
//       myAddress,
//       randomTokenId,
//       uri,
//       setQrvalue,
//       (result) => {
//         alert(JSON.stringify(result));
//       }
//     );
//   };
//   const onClickCard = (id) => {
//     if (tab === "WALLET") onClickMyCard(id);
//     if (tab === "MARKET") onClickMarketCard(id);
//   };

//   // onClickMyCard
//   const onClickMyCard = (tokenId) => {
//     KlipAPI.listingCard(myAddress, tokenId, setQrvalue, (result) => {
//       alert(JSON.stringify(result));
//     });
//   };

//   // onClickMarketCard
//   const onClickMarketCard = (tokenId) => {
//     KlipAPI.buyCard(tokenId, setQrvalue, (result) => {
//       alert(JSON.stringify(result));
//     });
//   };

//   return (
//     <div>
//       <NavBar />
//       <div
//         style={{
//           backgroundColor: "black",
//           display: "flex",
//           alignItems: "center" /* 수직 정렬 */,
//           flexDirection: "column" /* default: row */,
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ backgroundColor: "black", padding: 10 }}>
//           <div style={{ color: "white" }}>내 지갑</div>
//           <h2 style={{ color: "white" }}> {myAddress} </h2>
//           <br />
//           <Alert
//             variant={"balance"}
//             style={{ backgroundColor: "#f40075", fontSize: 25, color: "white" }}
//             onClick={getUserData}
//           >
//             {myBalance}
//           </Alert>
//         </div>
//         <Container
//           style={{
//             backgroundColor: "black",
//             display: "flex",
//             alignItems: "center" /* 수직 정렬 */,
//             flexDirection: "column" /* default: row */,
//             justifyContent: "center",
//           }}
//         >
//           <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />
//         </Container>
//         <div style={{ margin: "auto" }} size={128}>
//           {/* 갤러리(마켓, 내 지갑) */}
//           {tab === "MARKET" || tab === "WALLET" ? (
//             <div className="container" style={{ padding: 0, width: "100%" }}>
//               {nfts.map((nft, index) => {
//                 <Card.Img
//                   onClick={() => {
//                     onClickCard(nft.id);
//                   }}
//                   className="img-responsive"
//                   src={nfts[index].uri}
//                 />;
//               })}
//             </div>
//           ) : null}

//           {/* 발행 페이지 */}
//           {tab === "MINT" ? (
//             <div className="container" style={{ padding: 0, width: "100%" }}>
//               <Card
//                 className="text-center"
//                 style={{
//                   color: "black",
//                   height: "50%",
//                   borderColor: "#C5B358",
//                 }}
//               >
//                 <Card.Body style={{ opacity: 0.9, backgroundColor: "black" }}>
//                   {mintImageUrl !== "" ? (
//                     <Card.Img src={mintImageUrl} height={"50%"} />
//                   ) : null}
//                   <Form>
//                     <Form.Group>
//                       <Form.Control
//                         value={mintImageUrl}
//                         onChange={(e) => {
//                           console.log(e.target.value);
//                           setMintImageUrl(e.target.value);
//                         }}
//                         type="text"
//                         placeholder="이미지 주소를 입력해주세요"
//                       />
//                     </Form.Group>
//                     <Button
//                       onClick={() => {
//                         onClickMint(mintImageUrl);
//                       }}
//                       variant="primary"
//                       style={{
//                         backgroundColor: "#810034",
//                         borderColor: "#810034",
//                       }}
//                     >
//                       발행하기
//                     </Button>
//                   </Form>
//                 </Card.Body>
//               </Card>
//             </div>
//           ) : null}
//         </div>

//         {/* 모달 */}
//         {/* 탭 */}
//         <nav
//           style={{
//             backgroundColor: "#1b1717",
//             height: 45,
//             margin: "auto",
//           }}
//           className="navbar fixed-bottom navbar-light"
//           role="navigation"
//         >
//           <Nav className="w-100">
//             <div className="d-flex flex-row justify-content-around w-100">
//               <div
//                 onClick={() => {
//                   setTab("MARKET");
//                   fetchMarketNFTs();
//                 }}
//                 className="row d-flex flex-column justify-content-center align-items-center"
//               >
//                 <div>MARKET</div>
//               </div>

//               <div
//                 onClick={() => {
//                   setTab("MINT");
//                   fetchMarketNFTs();
//                 }}
//                 className="row d-flex flex-column justify-content-center align-items-center"
//               >
//                 <div>MINT</div>
//               </div>

//               <div
//                 onClick={() => {
//                   setTab("WALLET");
//                   fetchMarketNFTs();
//                 }}
//                 className="row d-flex flex-column justify-content-center align-items-center"
//               >
//                 <div>WALLET</div>
//               </div>
//             </div>
//           </Nav>
//         </nav>
//       </div>
//     </div>
//   );
// }

// export default MyWallet;
