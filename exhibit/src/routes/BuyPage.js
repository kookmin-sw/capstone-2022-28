import React, { useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import { Typography, Button, Form, message, Input } from "antd";
import img from "../components/Image/001.png";

const { Title } = Typography;
const { TextArea } = Input;

const buyBtnListener = () => {
  alert("구매버튼 클릭!");
};

function BuyPage() {
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
          <img src={img} width="500" height="500" alt="image" />
          <label>
            <br />
            <br />
            <br />
            동영상 제목: 제목
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            동영상 설명: 설명
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
