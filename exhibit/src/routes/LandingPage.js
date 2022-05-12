import NavigationBar from "../components/Navbar/NavigationBar";
import axios from "axios";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";

function LandingPage() {
  const [IsMember, setIsMember] = useState(false);

  useEffect(async () => {
    let header_token;
    try {
      header_token = localStorage.getItem("access_token");
    } catch (err) {
      header_token = "";
    }
    console.log(header_token);
    const res = await axios.get("http://localhost:8000/oauth/checkAuth", {
      headers: {
        Authorizations: `${header_token}`,
      },
    });
    setIsMember(res.data.isAuth);
  }, []);

  // 로그인됨
  if (IsMember) {
    console.log("login");
    return (
      <div>
        <LoginNavigationBar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>LandingPage</h1>
        </div>
      </div>
    );
  }
  // 로그인 안됨
  else {
    console.log("Not login");
    return (
      <div>
        <NavigationBar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>LandingPage</h1>
        </div>
      </div>
    );
  }
}

export default Auth(LandingPage, null);
