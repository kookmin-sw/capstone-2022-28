import React, { useState } from "react";
import { Typography, Form, Input, Button } from "antd";
import styles from "./UploadPage.module.css";
import Auth from "../../hoc/auth";
import LoginNavigationBar from "../../components/Navbar/LoginNavigationBar";
import { useNavigate } from "react-router-dom";
import { FileUpload, ImageUpload } from "react-ipfs-uploader";
import { listingCard, mintCardWithURI } from "../../api/UserKlip";
import axios from "axios";
import QRCode from "qrcode.react";
import { Modal } from "react-bootstrap";
import Footer from "../../components/Footer";
import "../../routes/page.css";

const { Title } = Typography;
const { TextArea } = Input;
var urlList = [];
let tokenId = 0;

const CategoryOptions = [
  { value: 0, label: "Art Wall" },
  { value: 1, label: "개인전" },
];

function UploadPage(props) {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setQrhide(false);
    setvTitle("");
    setvideoDescription("");
  };

  const handleShow = async () => {
    const time = await Number(new Date().getTime());
    setFileUrl("");
    setShow(true);
    tokenId = time;
  };

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
  const [mintorlist, setMintorlist] = useState("NFT Minting하기");
  const [closeModal, setCloseModal] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
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
      axios
        .post("http://3.39.32.4:8000/video/insert", insertDate)
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log("error : ", error.response);
        });
    }
  };

  const AddHandler = () => {
    const insertdata = {
      Url: fileUrl,
      titleList: vTitle,
      descriptionList: videoDescription,
      tokenList: tokenId,
    };
    urlList.push(insertdata);
  };

  return (
    <div className="page">
      <LoginNavigationBar />

      <div class="Cbody">
        <div>
          <Title level={2} class={styles.title}>
            전시회 개최
          </Title>
        </div>
        <div className={styles.box}>
          <label>전시회 포스터</label>
          <ImageUpload setUrl={setPosterUrl} />
          <br />

          <label>작품 업로드({urlList.length})</label>
          <br />
          <Button size="lg" type="primary" onClick={handleShow}>
            업로드 하러가기
          </Button>
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
                setUrl={async (url) => {
                  setFileUrl(url);
                  setQrhide(true);
                  setMintorlist("NFT Minting하기");
                  await mintCardWithURI(
                    localStorage.getItem("addressW"),
                    tokenId,
                    url,
                    setQrvalue,
                    () => {
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
                  <p>{mintorlist}</p>
                  <hr></hr>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <QRCode
                      value={qrvalue}
                      size={200}
                      style={{ margin: "auto" }}
                    ></QRCode>
                  </div>
                  <br></br>
                </div>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={async () => {
                  if (vTitle === "" || videoDescription === "")
                    alert("비디오 정보를 입력해주세요.");
                  else if (fileUrl === "") {
                    alert("NFT 민팅을 완료해주세요.");
                  } else {
                    setQrhide(true);
                    setMintorlist("Market에 등록하기");
                    listingCard(
                      localStorage.getItem("addressW"),
                      tokenId,
                      setQrvalue,
                      (result) => {
                        alert("마켓에 NFT가 등록되었습니다.");
                      }
                    );
                    closeModal(true);
                  }
                }}
              >
                ① 마켓 등록
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  AddHandler();
                  handleClose();
                }}
              >
                ② 비디오 추가
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
            ></Input>
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

      <Footer />
    </div>
  );
}

export default Auth(UploadPage, true);
