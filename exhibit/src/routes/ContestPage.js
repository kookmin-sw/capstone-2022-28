import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/Layout";
import "./banner.css"
import Footer from "../components/Footer"


function Exhibition({ exhibition }) {
  const [show, setShow] = useState(false);

  return (
    <ImgBox 
      id={exhibition.id}
      src={exhibition.poster_url}
      alt={exhibition.title}
    />
  );
}

function ContestPage() {

  const [exhibition, setExhibition] = useState([]);

  useEffect(async()=>{

    // const result = await axios.get("http://localhost:8000/video/get_art",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_art",{
      
    headers:{
        category:0,
      }
    })
    setExhibition(result.data);
    console.log(result);

  },[]);

  return (
    <div>
    <header
    class="banner"
    style={{backgroundSize:'cover',
    backgroundImage: `url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg")`,
    backgroundPosition:'center center',}}>
      <div class='banner__contents'>
        <h1 class='banner__title'>title</h1>
        <button class="banner__btn">Play</button>
        <button class="banner__btn">구매하기</button>

      </div>

      <h1 class="banner__description">
        description description description description description description description description description description description description description description description description description
        description description description description description description description description description description description 
      </h1>
      <div className="banner--Bottom"/>
    </header>
    <div>
      <LoginNavigationBar />
      <body>
      </body>

      <h4 class='Text2'>김하연님의 전시회</h4>
      <div class="row__posters">
   
      {exhibition.map(
        exhibition => (<Exhibition  class='row__poster' exhibition={exhibition} key={exhibition.id}/>))}
      
</div>
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

export default Auth(ContestPage, true);
