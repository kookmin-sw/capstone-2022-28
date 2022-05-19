import React from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

function BestArtistPage() {
  return <div>BestArtistPage</div>;
}

export default Auth(BestArtistPage, true);
