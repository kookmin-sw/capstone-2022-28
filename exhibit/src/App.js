import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import ArtPage from "./routes/ArtPage";
import MyAssetPage from "./routes/MyAssetPage";
import MyAccount from "./routes/MyAccount";
import ContestPage from "./routes/ContestPage";
import MyArtPage from "./routes/MyArtPage";
import UploadPage from "./routes/UploadPage/UploadPage";
import Caver from "caver-js";
import Data from "./data.js"
import Kakao from "./routes/LoginModal/kakao";

const COUNT_CONTRACT_ADDRESS = "0x3aEDa4A4e7EA89fC72C0CAf6e95C11f19493f8d7";
const ACCESS_KEY_ID = "KASKO3SVMXYIKU61S1AN326W";
const SECRET_ACCESS_KEY = "f5wGsFBfteeRc0bXxKwoK1DG-45JKzqmYNiUEwvs";
const Authorization =
  "Basic S0FTS08zU1ZNWFlJS1U2MVMxQU4zMjZXOmY1d0dzRkJmdGVlUmMwYlh4S3dvSzFERy00NUpLenFtWU5pVUV3dnM=";

const CHAIN_ID = "1001"; // MAINNET 8217 TESTNNET 1001


/*const option = {
  headers:[ 
    {
      name: "Authorizati~on",
      value: "Basic "+ Buffer.from(ACCESS_KEY_ID + SECRET_ACCESS_KEY).toString("base64")
    },
    { name: "x-chain-id", value: CHAIN_ID }
  ]
}*/

function App() {
  return (
    <div>
    {/* <div>
      <Data />
    </div> */}
     <Router>
       <Routes>
         <Route path="/" element={<LandingPage />} />
         <Route path="/individual" element={<ArtPage />} />
         <Route path="/my-collection" element={<MyAssetPage />} />
         <Route path="/my-art" element={<MyArtPage />} />
         <Route path="/my-account" element={<MyAccount />} />
         <Route path="/art-wall" element={<ContestPage />} />
         <Route path="/upload" element={<UploadPage />} />
         <Route path="/loggedIn" element={<Data />} />
         <Route path="/oauth/kakao/callback" element={<Kakao />}/>
       </Routes>
     </Router>
    </div>
    
  );
}

export default App;
