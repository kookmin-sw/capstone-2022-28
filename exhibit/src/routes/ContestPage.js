import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Layout from "../components/Layout";

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

    const result = await axios.get("http://localhost:8000/video/get_art",{
    // const result = await axios.get("http://3.39.32.4:8000/video/get_art",{
      
    headers:{
        category:0,
      }
    })
    setExhibition(result.data);
    console.log(result);

  },[]);

  return (
    <div class="page">
      <LoginNavigationBar />
      <body class="page">
        <Layout>
          <h1 className="pageTitle">Art Wall</h1>
        </Layout>
      </body>
      {exhibition.map(
        exhibition => (<Exhibition exhibition={exhibition} key={exhibition.id}/>
      ))}
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
