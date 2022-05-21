import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import styles from "./UploadPage.module.css";
import Auth from "../../hoc/auth";
import LoginNavigationBar from "../../components/Navbar/LoginNavigationBar";
import { useNavigate } from "react-router-dom";
import { FileUpload, ImageUpload } from "react-ipfs-uploader";
import { mintCardWithURI } from "../../api/UserKlip";
import { addressW } from "../WalletModal/WalletModal";
import axios from "axios";
import QRCode from "qrcode.react";
import { Modal } from "react-bootstrap";

const { Title } = Typography;
const { TextArea } = Input;
var urlList = [];
var titleList = [];
var descriptionList = [];
let tokenList = [];

const CategoryOptions = [
  { value: 0, label: "Competition" },
  { value: 1, label: "Challenge" },
];

function UploadPage(props) {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  let timestamps = new Date().getTime();


  const [posterUrl, setPosterUrl] = useState("");
  const [qrvalue, setQrvalue] = useState("DEFAULT");

  const [VideoTitle, setVideoTitle] = useState("");
  const videoTitleHandler = (event) => {
    setVideoTitle(event.target.value);
  };

  const [vTitle, setvTitle] = useState("");
  const TitleHandler = (event) => {
    setvTitle(event.target.value);
  };

  const [Description, setDescription] = useState("");
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const [videoDescription, setvideoDescription] = useState("");
  const videodescriptionHandler = (event) => {
    setvideoDescription(event.target.value);
  };

  const [Category, setCategory] = useState(0);
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const [qrhide, setQrhide] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(Category);
    if (
      posterUrl === "" ||
      urlList.length === 0 ||
      Description === "" ||
      VideoTitle === ""
    ) {
      alert("모든 정보를 입력해야합니다.");
    } else {
      const insertDate = {
        title: VideoTitle,
        description: Description,
        category: Category,
        videosUrl: urlList,
        posterUrl: posterUrl,
        nick: localStorage.getItem("nick"),
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
    }
  };

  const AddHandler = (event) => {
    const insertdata = {
      Url: fileUrl,
      titleList: vTitle,
      descriptionList: videoDescription,
      tokenList : timestamps,
    };
    urlList.push(insertdata);

    console.log(urlList);
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

        <label>작품 업로드({urlList.length})</label>
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
            <FileUpload
              setUrl={(url) => {
                setFileUrl(url);
                setQrhide(true);
                //            alert("주소 : "+addressW+", url : "+url);
                mintCardWithURI(
                  localStorage.getItem("addressW"),
                  {timestamps},
                  url,
                  setQrvalue,
                  (result) => {
                    alert("NFT가 민팅되었습니다.");
                  }
                );
              }}
            />

            <label>비디오 제목</label>
            <Input
              onChange={TitleHandler}
              value={vTitle}
              style={{ marginBottom: "2rem" }}
            />
            <br />

            <label>비디오 설명</label>
            <TextArea
              onChange={videodescriptionHandler}
              value={videoDescription}
              style={{ marginBottom: "2rem" }}
            />
            <br />

            {qrhide ? (
              <div>
                <p>NFT Minting하기</p>
                <hr></hr>
                <br></br>
                <div style={{ display: "flex" }}>
                  <QRCode value={qrvalue} size={200} style={{ margin: "auto" }}>
                    작품 Minting
                  </QRCode>
                </div>
                <br></br>
              </div>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                if (vTitle === "" || videoDescription === "")
                  alert("비디오 정보를 입력해주세요.");
                else {
                  AddHandler();
                  handleClose();
                  setvTitle("");
                  setvideoDescription("");
                }
              }}
            >
              비디오 추가하기
            </Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={onSubmitHandler}>
          <div className={styles.contents}></div>
          <br />
          <br /> <br></br>
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
