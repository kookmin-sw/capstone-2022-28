import React, { useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import { Typography, Button, Form, message, Input } from "antd";
import img from "../components/Image/001.png";
import { useLocation } from "react-router-dom";
import VideoImageThumbnail from 'react-video-thumbnail-image';


const { Title } = Typography;
const { TextArea } = Input;

const buyBtnListener = () => {
  alert("구매버튼 클릭!");
};

function BuyPage() {
  const video_datas = useLocation();
  const video_title = video_datas.state.title;
  const video_description = video_datas.state.description;
  const video_url = video_datas.state.url;

  console.log("비디오정보", video_datas.state);
  
  return (
    <div>
      <LoginNavigationBar />
      <div style={{ maxWidth: "1100px", margin: "7rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Title level={2}>Buy Video</Title>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <VideoImageThumbnail 
                videoUrl={video_url}
                width={500}
                height={500}
                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                alt={video_title}
              />   */}
          <img src={img} width="500" height="500" alt="image" />
          <label>
            <br />
            <br />
            <br />
            동영상 제목: {video_title}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            동영상 설명: {video_description}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            동영상 가격: 가격
          </label>
          <br />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="lg" type="primary" onClick={buyBtnListener}>
          구매하기
        </Button>
      </div>
    </div>
  );
}

export default Auth(BuyPage, true);
