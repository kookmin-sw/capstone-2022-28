import React, { useEffect } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css"
import axios from "axios";

function MyArtPage() {

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

    // const result = await axios.get("http://localhost:8000/video/get_myart",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_myart",{
    headers:{
        nick:charToUni(nick),
      }
    })
    console.log("result가 들어왔어요~~~~~~~~",result);
    // navigate("/");

  },[]);


  return (
    <div class="page">
      <LoginNavigationBar />
      <div class = "page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 class = "title">내 전시회</h1>
      </div>
    </div>
  );
}

export default Auth(MyArtPage, true);
