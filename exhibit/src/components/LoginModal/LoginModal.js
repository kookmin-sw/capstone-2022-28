import React from "react";
import { Modal } from "react-bootstrap";
import login_btn from "../Image/kakao_login.png";
import img from "../Image/img.png";
import styles from "./LoginModal.module.css";

function LoginModal(props) {
  const REST_API_KEY = "b978902c0e045f8489bcff34e3d15077";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `http://localhost:8000/oauth/kakao`;
  
  const loginHandler = () => {
    window.open(KAKAO_AUTH_URL, '_self')
  }

  return (
    <Modal
      {...props}
      size="1g"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={styles.modal_header}>
        카카오로 로그인 / 회원가입
      </Modal.Header>
      <Modal.Body className={styles.modal_body}>
        <img src={img} />
      </Modal.Body>
      <Modal.Footer className={styles.loginBtn}>
        <img src={login_btn} onClick={loginHandler} />
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
