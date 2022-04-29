import React from "react";
import { Modal } from "react-bootstrap";
import login_btn from "../../components/Image/kakao_login.png";
import img from "../../components/Image/img.png";
import styles from "./LoginModal.module.css";
import queryString from 'query-string';
import axios from "axios";
import { ConsoleSqlOutlined } from "@ant-design/icons";

axios.defaults.withCredentials = true;

function LoginModal(props) {
  const REST_API_KEY = "b978902c0e045f8489bcff34e3d15077";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
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
        <img src={img}/>
      </Modal.Body>
      <Modal.Footer className={styles.loginBtn}>
        <img src={login_btn} onClick={loginHandler} />

      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
