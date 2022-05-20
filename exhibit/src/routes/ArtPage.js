'use strict';

import React, { useState, useEffect, useRef } from "react";
import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToolTwoTone } from "@ant-design/icons";
import { Modal } from "react-bootstrap";
import "./page.css";
import "./cardmodal.css"

import { modalGlobalConfig } from "antd/lib/modal/confirm";


function Exhibition({ exhibition }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => {
    setShow(true);
  };

  return (
    <span>
    <ImgBox 
      id={exhibition.id}
      src={exhibition.poster_url}
      alt={exhibition.title}
      onClick={handleShow}
    />
    <Modal 
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton class="modal_header">
          
        </Modal.Header>
        <Modal.Body>
          <img class="poster" id={exhibition.id} src={exhibition.poster_url}/>
          <br/>
          <h1>{exhibition.title}</h1>
          <br/><br/><br/>
          <div> {exhibition.description}</div>
        </Modal.Body>
        <Modal.Body>
        <div class="card">
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <img src="https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"  class="image"/>
      <div>
      <h1>{exhibition.title}</h1>
      <span>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</span>
      </div>
    <button style={{ float:'right' }}class="Cbtn">buy</button>
    </div>
  </div>
  

  

  


        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
    </Modal>
    </span>
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
