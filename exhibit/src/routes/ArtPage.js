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
import VideoImageThumbnail from 'react-video-thumbnail-image';
import { modalGlobalConfig } from "antd/lib/modal/confirm";

function Exhibition({ exhibition }) {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const moveBuyPage = ( video ) => { 
    navigate('/buy', {
      state: {
        title: video.title,
        description: video.description,
        url: video.url,
      },
    });
  };
  
  const handleShow = async(id) => {
    setShow(true);
    // const video_result = await axios.get("http://localhost:8000/video/get_video",{
    const video_result = await axios.get("http://3.39.32.4:8000/video/get_video",{
      headers:{
          exhibition:id,
        }
      })
      console.log("video_result가 들어왔어요~~~~~~~~",video_result);
    setVideo(video_result.data);
    console.log("video!!!!!!!", video);
  };

  return (
    
    <span>
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
     <div class="modal_header">
     <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
     </div>
          
        <Modal.Body class="modal_body">
          <img class="poster" id={exhibition.id} src={exhibition.poster_url}/>
          <br/>
          <h1 class="title">{exhibition.title}</h1>
          <br/><br/><br/>
          <div class="title"> {exhibition.description}</div>
        </Modal.Body>
        <Modal.Body class="modal_body">
          {video.map((video) => 
            <div class="FrameRoot">
          <div style={{ display: 'flex', flexDirection: 'row' }}>

//             <img class="video" src={video.url} alt={video.title}/>
            <div class="thumbnail">
              <VideoImageThumbnail 
                videoUrl={video.url}
                width={150}
                height={100}
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                alt={video.title}
              />  
            </div>
            {/* <img class="image" src={video.url} alt={video.title}/> */}
            <div>
            <h4 class="Text2"> {video.title} </h4>
            <span class="Text1"> {video.description} </span>
            </div>
          <button style={{ float:'right' }} class="Cbtn" onClick={() => moveBuyPage(video)}>buy</button>
          </div>
        </div>
      )}
      
      </Modal.Body>
      
    </Modal>
    </span>

    // <Modal
    //     show={show}
    //     onHide={handleClose}
    //     size="lg"
    //     aria-labelledby="contained-modal-title-vcenter"
    //     centered
    // >
    //     <Modal.Header closeButton>
    //       {exhibition.title}
    //       <ImgBox class="img-responsive center-block" id={exhibition.id} src={exhibition.poster_url}/>
    //     </Modal.Header>
    //     <Modal.Body>
    //       {exhibition.description}
    //     </Modal.Body>
    //     <Modal.Footer>
    //     </Modal.Footer>
    // </Modal>

  );
}

function ArtPage() {
  const [exhibition, setExhibition] = useState([]);
  
  useEffect(async()=>{
    // const exhibition_result = await axios.get("http://localhost:8000/video/get_art",{
    const exhibition_result = await axios.get("http://3.39.32.4:8000/video/get_art",{
      
    headers:{
        category:1,
      }
    })
    setExhibition(exhibition_result.data);
    console.log(exhibition_result);

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

const Text1 = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-family: Poppins;
  font-weight: 500;
  align-self: stretch;
  font-size: ${(props) => props.fontSize};
`;
const Text2 = styled.div`
  color: #ffffff;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 700;
`;
const FrameRoot = styled.div`
  background-color: #69aae7;
  width: 337px;
  height: 621px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-left: 31px;
  padding-right: 31px;
  margin: auto;
  border-radius: 20px;
`;
const Image1 = styled.img`
  width: 337px;
  height: 389px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 65px;
  align-items: flex-start;
`;
const ArtistAndTitle = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;
const CurrentBid1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const PurpleHeartText = styled.div`
  color: #ffffff;
  display: flex;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 500;
  background-color: #8e3bf1;
  width: 337px;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
`;


export default Auth(ArtPage, true);
