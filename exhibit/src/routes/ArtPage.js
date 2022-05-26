"use strict";

import React, { useState, useEffect } from "react";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import "./page.css";
import VideoImageThumbnail from "react-video-thumbnail-image";
import Footer from "../components/Footer";

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
        token: video.tokenId,
        creator_nick: video.userNick,
      },
    });
  };

  const handleShow = async (id) => {
    setShow(true);
    // const video_result = await axios.get(
    //  "http://localhost:8000/video/get_video",
    const video_result = await axios.get(
      "http://3.39.32.4:8000/video/get_video",
      {
        headers: {
          exhibition: id,
        },
      }
    );
    setVideo(video_result.data);
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
        <Modal.Header closeButton className="modal_header">
          상세정보
        </Modal.Header>
        <Modal.Body className="modal_body">
          <img class="poster" id={exhibition.id} src={exhibition.poster_url} />
          <br />
          <h1 class="title">{exhibition.title}</h1>
          <br />

          <div class="title"> {exhibition.description}</div>
        </Modal.Body>
        <Modal.Body className="modal_body">
          {video.map((video) => (
            <div class="FrameRoot">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  class="video"
                  onClick={() =>
                    navigate("/video", {
                      state: {
                        title: video.title,
                        description: video.description,
                        url: video.url,
                        creator_nick: video.userNick,
                      },
                    })
                  }
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
                <div>
                  <h4 class="Text2"> {video.title} </h4>
                  <span class="Text1"> {video.description} </span>
                </div>
                {video.isBuy === "1" ? (
                  <button
                    style={{ float: "right" }}
                    class="Cbtn"
                    onClick={() => moveBuyPage(video)}
                  >
                    buy
                  </button>
                ) : (
                  <div
                    style={{
                      float: "right",
                      position: "absolute",
                      right: "40px",
                    }}
                  >
                    매진되었습니다.
                  </div>
                )}
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </span>
  );
}

function ArtPage() {
  const [exhibition, setExhibition] = useState([]);

  useEffect(async () => {
    // const exhibition_result = await axios.get(
    //  "http://localhost:8000/video/get_art",{
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
    <div class="page">
      <LoginNavigationBar />
      <div class="Cbody">
        <h4 className="Text2">개인전</h4>
        <div>
          {exhibition.map((exhibition) => (
            <Exhibition exhibition={exhibition} key={exhibition.id} />
          ))}
        </div>
      </div>
      <Footer />
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
