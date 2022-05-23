import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css"
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/Layout";
import Footer from "../components/Footer"

function MyArt({ myArt }) {
  return (
    <ImgBox 
      id={myArt.id}
      src={myArt.poster_url}
      alt={myArt.title}
    />
  );
}

function MyArtPage() { 
  const [myArt, setMyArt] = useState([]);

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

    const result = await axios.get("http://localhost:8000/video/get_myart",{
    // const result = await axios.get("http://3.39.32.4:8000/video/get_myart",{
    headers:{
        nick:charToUni(nick),
      }
    })
    setMyArt(result.data);
    console.log("result가 들어왔어요~~~~~~~~",result);
    // navigate("/");

  },[]);


  return (
    <div class="page">
      <LoginNavigationBar />
      <div class="Cbody">
          <h1 className="Text2">내 전시회</h1>
        
      {myArt.map(
        myArt => (<MyArt myArt={myArt} key={myArt.id}/>
      ))}
      </div>
      <Footer/>
    </div>
  );
}

const ImgBox = styled.img`
  width: 220px;
  height: 308px;
  border-radius: 7px;
  margin: 10px;
  
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.35s;
  }
`;

export default Auth(MyArtPage, true);
