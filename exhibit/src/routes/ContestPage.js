import React, { useEffect } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ContestPage() {
  const navigate = useNavigate();

  useEffect(async()=>{

    // const result = await axios.get("http://localhost:8000/video/get_art",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_art",{
      
    headers:{
        category:0,
      }
    })
    console.log(result);
    // navigate("/");

  },[]);

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
        <div class="page__background"></div>
        <h1 class="title">Art Wall</h1>
      </div>
    </div>
  );
}

export default Auth(ContestPage, true);
