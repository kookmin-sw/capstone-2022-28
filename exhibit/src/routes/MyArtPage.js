import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import { Modal } from "react-bootstrap";
import "./page.css";
import VideoImageThumbnail from "react-video-thumbnail-image";
import { useNavigate } from "react-router-dom";

function MyArt({ myArt }) {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async (id) => {
    setShow(true);
    // const video_result = await axios.get(
    //   "http://localhost:8000/video/get_video",
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
        id={myArt.id}
        src={myArt.poster_url}
        alt={myArt.title}
        onClick={() => handleShow(myArt.id)}
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
          <img class="poster" id={myArt.id} src={myArt.poster_url} />
          <br />
          <h1 class="title">{myArt.title}</h1>
          <br />

          <div class="title"> {myArt.description}</div>
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
                    alt={video.title}
                  />
                </div>
                <div>
                  <h4 class="Text2"> {video.title} </h4>
                  <span class="Text1"> {video.description} </span>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </span>
  );
}

function MyArtPage() {
  const [myArt, setMyArt] = useState([]);

  useEffect(async () => {
    const nick = localStorage.getItem("nick");
    const charToUni = (char) => {
      var uni_code = "";
      for (var i = 0; i < char.length; i++) {
        uni_code += "\\" + char[i].charCodeAt(0).toString(16);
      }
      return uni_code;
    };

    // const result = await axios.get("http://localhost:8000/video/get_myart",{
    const result = await axios.get("http://3.39.32.4:8000/video/get_myart", {
      headers: {
        nick: charToUni(nick),
      },
    });
    setMyArt(result.data);
  }, []);

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class="Cbody">
        <h1 className="Text2">내 전시회</h1>
        <div>
          {myArt.map((myArt) => (
            <MyArt myArt={myArt} key={myArt.id} />
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

export default Auth(MyArtPage, true);
