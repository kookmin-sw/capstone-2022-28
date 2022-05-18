import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import styles from "./UploadPage.module.css";
import Auth from "../../hoc/auth";
import LoginNavigationBar from "../../components/Navbar/LoginNavigationBar";
import { useNavigate } from "react-router-dom";
import { FileUpload, ImageUpload} from "react-ipfs-uploader";
import { mintCardWithURI } from "../../api/UserKlip";
import { addressW } from "../WalletModal/WalletModal";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

const { Title } = Typography;
const { TextArea } = Input;
var urlList = []

const CategoryOptions = [
  { value: 0, label: "Competition" },
  { value: 1, label: "Challenge" },
];


function UploadPage(props) {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => {
    setShow(true);
  };

  const [posterUrl, setPosterUrl] = useState("");

  const [VideoTitle, setVideoTitle] = useState("");
  const videoTitleHandler = (event) => {
    setVideoTitle(event.target.value);
  };

  
  const [Description, setDescription] = useState("");
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const [Category, setCategory] = useState(0);
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(Category);

    const insertDate ={
      "title":VideoTitle,
      "description":Description,
      "category":Category,
      "videosUrl":urlList,
      "posterUrl":posterUrl
      "nick":localStorage.getItem("nick")
    };
    // axios.post('http://localhost:8000/video/insert',insertDate)
    axios.post("http://3.39.32.4:8000/video/insert", insertDate)
      .then((response) => {
        console.log(response);
        alert("디비 저장 ~");
        navigate("/");

      })
      .catch((error) => {
        console.log("error : ", error.response);
      });

  };

  const AddHandler = (event) => {
    const insertdata = {
      "Url" : fileUrl,
    }
    urlList.push(insertdata)
   console.log(urlList)
     
  };
  
  return (
    <div>
      <LoginNavigationBar />
      <div className={styles.root}>
        <div className={styles.title}>
          <Title level={2}>전시회 개최</Title>
        </div>
        <label>전시회 포스터</label>
        <ImageUpload setUrl={setPosterUrl} />
        <br />

        <label>작품 업로드</label>
        <br />
        <Button size="lg" type="primary" onClick={handleShow}>
          업로드 하러가기
        </Button>
        {/* 업로드 모달 */}
        <Modal
          show={show}
          onHide={handleClose}
          {...props}
          size="1g"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>비디오 추가하기</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FileUpload setUrl={(url) => {
              setFileUrl(url);
//               alert("주소 : "+addressW+", url : "+url);
              mintCardWithURI(addressW, 1213213200, url);
            }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ () => {
            AddHandler()
            handleClose()
             } }>
              비디오 추가하기
            </Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={onSubmitHandler}>
          <div className={styles.contents}></div>
          <br />
          <label>가격</label>
          
        
            <br/> <br></br>

          <label>전시회 제목</label>
          <Input
            onChange={videoTitleHandler}
            value={VideoTitle}
            style={{ marginBottom: "2rem" }}
          />
          <br />

          <label>전시회 설명</label>
          <TextArea
            onChange={descriptionHandler}
            value={Description}
            style={{ marginBottom: "2rem" }}
          />
          <br />

          <select onChange={categoryHandler} style={{ marginBottom: "2rem" }}>
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />

          <br />

          <div className={styles.submitBtn}>
            <Button
              className="submitBtn"
              size="lg"
              type="primary"
              onClick={onSubmitHandler}
            >
              전시회 개최
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Auth(UploadPage, true);
