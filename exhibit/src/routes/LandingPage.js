import NavigationBar from "../components/Navbar/NavigationBar";
import axios from "axios";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import "./page.css"

function LandingPage() {
  let isMember = localStorage.getItem("isMember");
  console.log("landing", isMember);
  // 로그인됨
  if (isMember) {
    console.log("login");
    return (
      <div>
        <LoginNavigationBar />
        <div class="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 class="title">LandingPage</h1>
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
        <div class="page"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 class="title">LandingPage</h1>
        </div>
      </div>
    );
  }
}

export default Auth(LandingPage, null);