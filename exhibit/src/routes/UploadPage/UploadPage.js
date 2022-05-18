import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./UploadPage.module.css";
import Auth from "../../hoc/auth";
import LoginNavigationBar from "../../components/Navbar/LoginNavigationBar";
import { FileUpload, ImageUpload} from "react-ipfs-uploader";
import { mintCardWithURI } from "../../api/UserKlip";
import { addressW } from "../WalletModal/WalletModal";

const { Title } = Typography;
const { TextArea } = Input;

const CategoryOptions = [
  { value: 0, label: "Competition" },
  { value: 1, label: "Challenge" },
];

function UploadPage() {
  const [videosUrl, setVideoUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const [VideoTitle, setVideoTitle] = useState("");
  const videoTitleHandler = (event) => {
    setVideoTitle(event.target.value);
  };

  const [Description, setDescription] = useState("");
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const [Category, setCategory] = useState("");
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const onDropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert("업로드 버튼 누름!");
  };

  return (
    <div>
      
      <LoginNavigationBar />
      <div className={styles.root}>
        <div className={styles.title}>
          <Title level={2}>전시회 개최</Title>
        </div>
        <label>전시회 포스터</label>
        <ImageUpload setUrl={setPosterUrl}/>
        <br/>

        <label>작품 업로드</label>
          <FileUpload setUrl={(url) => {
            alert("주소 : "+addressW+", url : "+url);
            mintCardWithURI("0x8aBba335E30Ff1107335833DA4f3fD68b548B999", 1213213200, "https://aws1.discourse-cdn.com/standard17/uploads/klaytn/original/2X/0/0532ecfe0e448b4fca3131702ba68f1a05ff361d.png");
          }} />
          {/* {mintCardWithURI(addressW, 100, multipleVideosUrl)} */}
        <Form onSubmit={onSubmitHandler}>
          <div className={styles.contents}>
            {/* Drop Zone */}

            
            {/* <Dropzone
              onDrop={onDropHandler}
              multiple={false}
              maxSize={9000000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div className={styles.dropZone} {...getRootProps()}>
                  <input {...getInputProps()}  />
                  <PlusOutlined style={{ fontSize: "3rem"}} />
                </div>
              )}
            </Dropzone> */}
          </div>
          <br />

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
            <Button className="submitBtn" size="lg" type="primary" onClick={onSubmitHandler}>
              전시회 개최
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Auth(UploadPage, true);
