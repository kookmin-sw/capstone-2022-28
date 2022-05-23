import React, { useEffect, useState } from "react";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import "./banner.css"
import Footer from "../components/Footer"
import { Modal } from "react-bootstrap";
import "./page.css";
import VideoImageThumbnail from "react-video-thumbnail-image";


function Exhibition({ exhibition }) {
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);
  const [allVideo, setAllVideo] = useState([]);
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
    console.log("video_result가 들어왔어요~~~~~~~~", video_result);
    setVideo(video_result.data);
    console.log("video!!!!!!!", video);
  };
  let random_index = Math.floor(Math.random() * allVideo.length);

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
        <Modal.Header closeButton className='modal_header'>
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
                {/* <img class="video" src={video.url} alt={video.title}/> */}
                <div
                  class="video"
                  onClick={() => navigate("/video", {
                    state: {
                      title: video.title,
                      description: video.description,
                      url: video.url,
                      creator_nick: video.userNick,
                    },})}
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

function ContestPage() {

  const [exhibition, setExhibition] = useState([]);
  const [allVideo, setAllVideo] = useState([]);
  // const [video, setVideo] = useState([]);

  useEffect(async () => {
    // const exhibition_result = await axios.get(
    //  "http://localhost:8000/video/get_art",{
    const exhibition_result = await axios.get(
      "http://3.39.32.4:8000/video/get_art",{
      
        headers: {
          category: 0,
        },
      }
    );
    const all_video_result = await axios.get(
      "http://3.39.32.4:8000/video/get_all_video"
    );

    setExhibition(exhibition_result.data);
    setAllVideo(all_video_result.data);
    console.log(exhibition_result);
  }, []);

  // let random_index = Math.floor(Math.random() * video.length);

  return (
    <div class="page">
      <LoginNavigationBar />
      <div class="Cbody">
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
    <div style={{minHeight: '200px'}}>
      <h4 class='Text2'>김하연님의 전시회</h4>
      
      <div class="row__posters">
   
      {exhibition.map(
        exhibition => (<Exhibition  class='row__poster' exhibition={exhibition} key={exhibition.id}/>))}
      
</div>
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
