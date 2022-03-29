import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/LoginPage";
import ArtPage from "./routes/ArtPage";
import MyAssetPage from "./routes/MyAssetPage";
import MyAccount from "./routes/MyAccount";
import ContestPage from "./routes/ContestPage";
import MyWallet from "./routes/MyWallet";
import React, {useState} from "react";
import { getBalance, readCount, setCount } from './api/UserCaver'
import QRCode from "qrcode.react";
import "./App.css"


function onPressButton(balance) {
  console.log('hi');
}

const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}

function App() {
  const  [balance, setBalance] = useState(0);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/individual" element={<ArtPage />} />
        <Route path="/my-collection" element={<MyAssetPage />} />
        <Route path="/my-account" element={<MyWallet />} />
        <Route path="/art-wall" element={<ContestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
