import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import { Typography, Button, Form, message, Input } from "antd";
import img from "../components/Image/001.png";
import { Modal } from "react-bootstrap";
import { buyCard } from "../api/UserKlip";
import QRCode from "qrcode.react";

const { Title } = Typography;
const { TextArea } = Input;



function BuyPage(tokenId) {
  const [qrvalue, setQrvalue] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    buyCard(1653042229731, setQrvalue, () => {
      alert("작품이 성공적으로 구매되었습니다.")
    });
    setShow(true);
  };
  
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
        <Button size="lg" type="primary" onClick={handleShow}>
          구매하기
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          size="1g"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>비디오 구매</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{display: "flex"}}>

            <QRCode value={qrvalue} size={200} style={{ margin: "auto" }}></QRCode>
            
            </div>
          </Modal.Body>
          <Modal.Footer>
        
            <h7>가     격 ························································································· 0.01 KLAY</h7>
            <hr></hr>
        </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Auth(BuyPage, true);
