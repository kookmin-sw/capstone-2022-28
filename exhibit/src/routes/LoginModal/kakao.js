import React from "react";
import { Modal } from "react-bootstrap";
import login_btn from "../../components/Image/kakao_login.png";
import img from "../../components/Image/img.png";
import styles from "./LoginModal.module.css";
import queryString from 'query-string';
import axios from "axios";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;


const Kakao = (props) => {
const navigate = useNavigate(); 
  const REST_API_KEY = "b978902c0e045f8489bcff34e3d15077";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const query = queryString.parse(window.location.search);

//   getKakaoTokenHandler실행
  React.useEffect(() => {  
    if (query.code) {
      console.log(query.code)
      const token = getKakaoTokenHandler(query.code.toString()); 
      console.log("token====", token)
      navigate('/');
    }else{
      console.log("시리패");
    }
    
  }, []);

  // const loginHandler = () => {
  //   window.open(KAKAO_AUTH_URL, '_self')

  //   const query = queryString.parse(window.location.search);
  //   console.log(query)
  //   if (query.code) {
  //     console.log(query.code)
  //     const token = getKakaoTokenHandler(query.code.toString()); 
  //     console.log(token)
  //   }
  // }

  //code를 바탕으로 backend로 보내서 back에서 토큰받아오기
  const getKakaoTokenHandler = async (code) => {
  
    //서버로 요청
    await axios({
      method:"GET",
      url:`http://localhost:8000/oauth/kakao/callback?code=${code}`
    }).then(res =>{
      console.log(res);
      console.log("토큰은 여깄어~",res.data.tokens[0].jwt_access_token);
      window.localStorage.setItem("token", JSON.stringify({
        access_token: res.data.tokens[0].jwt_access_token,
        refresh_token:res.data.tokens[1].jwt_refresh_token
      })); 
    })

  }
    //일반 로그인
  const sendKakaoTokenToServer = (token) => {
    axios.post('/auth/kakao',{access_token: token})
      .then(res => {
        if (res.status == 201 || res.status == 200) {
          const user =res.data.user;
          window.localStorage.setItem("token", JSON.stringify({
            access_token: res.data.jwt_access_token,
            refresh_token:res.data.jwt_refresh_token
          })); 
          }
        else {
          window.alert("로그인에 실패하였습니다.");
        }
      })
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
        <a href={KAKAO_AUTH_URL}> 
        <img src={login_btn} /*onClick={loginHandler}*/ />
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default Kakao;
