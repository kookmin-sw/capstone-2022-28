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
import { Modal } from "react-bootstrap";
import { modalGlobalConfig } from "antd/lib/modal/confirm";


function Exhibition({ exhibition }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = async(id) => {
    setShow(true);

    // const result = await axios.get("http://localhost:8000/video/get_video",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_video",{
      headers:{
          exhibition:id,
        }
      })
      console.log("result가 들어왔어요~~~~~~~~",result);
     

  };

  return (
    <div>
    <ImgBox 
      id={exhibition.id}
      src={exhibition.poster_url}
      alt={exhibition.title}
      onClick={()=>handleShow(exhibition.id)}
    />
    <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
          {exhibition.title}
          <ImgBox class="img-responsive center-block" id={exhibition.id} src={exhibition.poster_url}/>
        </Modal.Header>
        <Modal.Body>
          {exhibition.description}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
      </div>
  );
}

function ArtPage() {
  const [exhibition, setExhibition] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => {
    setShow(true);
  };
  
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
          <h1 className="pageTitle">개인전</h1>
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

export default Auth(ArtPage, true);
