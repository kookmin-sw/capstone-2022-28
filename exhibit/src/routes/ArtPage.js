'use strict';

import React, { useState, useEffect, useRef } from "react";
import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import "./page.css";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToolTwoTone } from "@ant-design/icons";
import Button from '@material-ui/core/Button'; // Button을 import 한다.


function Exhibition({ exhibition }) {
  return (
    <Card
      id={exhibition.id}
      src={exhibition.poster_url}
      alt={exhibition.title}
      on
    />
  );
}


function ArtPage() {
  const [exhibition, setExhibition] = useState([]);
  useEffect(async()=>{
    // const result = await axios.get("http://localhost:8000/video/get_art",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_art",{
      
    headers:{
        category:0,
      }
    })
    setExhibition(result.data);

  },[]);

  return (
    <div class="page">
      <LoginNavigationBar />
      <body class="page">
        <Layout>
          <h1 className="pageTitle">개인전</h1>
        </Layout>
      </body>
      {exhibition.map(
        exhibition => (<Exhibition exhibition={exhibition} key={exhibition.id}/>
      ))}
    </div>
  );
}



export default Auth(ArtPage, true);
