import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./routes/LandingPage";
import LoginPage from "./routes/LoginPage";
import ArtPage from "./routes/ArtPage";
import MyAssetPage from "./routes/MyAssetPage";
import MyAccount from "./routes/MyAccount";
import ContestPage from "./routes/ContestPage";
import MyArtPage from "./routes/MyArtPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/individual" element={<ArtPage />} />
        <Route path="/my-collection" element={<MyAssetPage />} />
        <Route path="/my-art" element={<MyArtPage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/art-wall" element={<ContestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
