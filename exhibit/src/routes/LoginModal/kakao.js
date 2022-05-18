import React from "react";
import { Modal } from "react-bootstrap";
import login_btn from "../../components/Image/kakao_login.png";
import img from "../../components/Image/img.png";
import styles from "./LoginModal.module.css";
import queryString from "query-string";
import axios from "axios";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Kakao = (props) => {
  const navigate = useNavigate();
  const REST_API_KEY = "b978902c0e045f8489bcff34e3d15077";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const query = queryString.parse(window.location.search);

  //   getKakaoTokenHandler실행
  React.useEffect(async () => {
    if (query.code) {
      // console.log(query.code)
      const token = await getKakaoTokenHandler(query.code.toString());
      // console.log("token====", token);

      navigate("/");
    } else {
      console.log("시리패");
    }
  }, []);


  //code를 바탕으로 backend로 보내서 back에서 토큰받아오기
  const getKakaoTokenHandler = async (code) => {
    let header_token;
    try {
      header_token = localStorage.getItem("access_token");
    } catch (err) {
      header_token = "";
    }

    //서버로 요청
    await axios 
      .get(`http://localhost:8000/oauth/kakao/callback?code=${code}`, {
        // .get(`http://3.39.32.4:8000/oauth/kakao/callback?code=${code}`, {

        headers: {
          Authorizations: `${header_token}`,
        },
      })
      .then((res) => {
        if (res.data.result == "create") {
          //새롭게 db에 저장한 경우
          window.localStorage.setItem(
            "access_token",
            JSON.stringify(res.data.tokens.jwt_access_token)
          );
          window.localStorage.setItem(
            "refresh_token",
            JSON.stringify(res.data.tokens.jwt_refresh_token)
          );
        } else if (res.data.result == "update") {
          //기존에 접근한 적이 있던 사람이 재 접속
          console.log("토큰은 여깄어~");
        } else if (res.data.result == "invalid") {
          if (res.data.data == "TOKEN_EXPIRED") {
            //만료된 토큰일경우
          }
        }
      });
  };

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
        <a href={KAKAO_AUTH_URL}>
          <img src={login_btn} /*onClick={loginHandler}*/ />
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default Kakao;
