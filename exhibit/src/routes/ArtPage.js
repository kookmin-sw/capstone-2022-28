"use strict";

import React, { useState, useEffect, useRef } from "react";
import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FullscreenExitOutlined, ToolTwoTone } from "@ant-design/icons";
import { Modal, ModalTitle, Row } from "react-bootstrap";
import "./page.css";
// import "../css/bgs.css"
import VideoImageThumbnail from "react-video-thumbnail-image";
import { modalGlobalConfig } from "antd/lib/modal/confirm";
import Footer from "../components/Footer"
function Exhibition({ exhibition }) {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const moveBuyPage = (video) => {
    navigate("/buy", {
      state: {
        title: video.title,
        description: video.description,
        url: video.url,
        poster_url: exhibition.poster_url,
        poster_title: exhibition.title,
      },
    });
  };

  const handleShow = async (id) => {
    setShow(true);
    // const video_result = await axios.get("http://localhost:8000/video/get_video",{
    const video_result = await axios.get(
      "http://3.39.32.4:8000/video/get_video",
      {
        headers: {
          exhibition: id,
        },
      }
    );
    console.log("video_result가 들어왔어요~~~~~~~~", video_result);
    setVideo(video_result.data);
    console.log("video!!!!!!!", video);
  };

  return (
    <span>
      <ImgBox
        id={exhibition.id}
        src={exhibition.poster_url}
        alt={exhibition.title}
        onClick={() => handleShow(exhibition.id)}
      />

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton class='modal_header'>
        상세정보
      </Modal.Header>
        <Modal.Body>
          <img class="poster" id={exhibition.id} src={exhibition.poster_url} />
          <br />
          <h1 class="title">{exhibition.title}</h1>
          <br />
          
          <div class="title"> {exhibition.description}</div>
        </Modal.Body>
        <Modal.Body>
          {video.map((video) => (
            <div class="FrameRoot">
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <img class="video" src={video.url} alt={video.title}/> */}
                <div
                  class="video"
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <VideoImageThumbnail
            
                    videoUrl={video.url}
                    width={160}
                    height={120}
                    borderRadius={7}
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    alt={video.title}
                  />
                </div>
                {/* <img class="image" src={video.url} alt={video.title}/> */}
                <div>
                  <h4 class="Text2"> {video.title} </h4>
                  <span class="Text1"> {video.description} </span>
                </div>
                <button
                  style={{ float: "right" }}
                  class="Cbtn"
                  onClick={() => moveBuyPage(video)}
                >
                  buy
                </button>
              </div>
            </div>
          ))}
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

  useEffect(async () => {
    // const exhibition_result = await axios.get("http://localhost:8000/video/get_art",{
    const exhibition_result = await axios.get(
      "http://3.39.32.4:8000/video/get_art",
      {
        headers: {
          category: 1,
        },
      }
    );
    setExhibition(exhibition_result.data);
    console.log(exhibition_result);
  }, []);

  return (
    <div>
      <LoginNavigationBar />
      <body>

      </body>
          <h4 className="Text2" style={{marginTop:"80px", paddingTop:'40px'}}>개인전</h4>
 
      {exhibition.map((exhibition) => (
        <Exhibition exhibition={exhibition} key={exhibition.id} />
      ))}

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

export default Auth(ArtPage, true);
