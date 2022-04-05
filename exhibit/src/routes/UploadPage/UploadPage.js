import React, { useState } from "react";
import NavigationBar from "../../components/Navbar/NavigationBar";
import Dropzone from "react-dropzone";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./UploadPage.module.css";

const { Title } = Typography;
const { TextArea } = Input;

const CategoryOptions = [
  { value: 0, label: "Competition" },
  { value: 1, label: "Challenge" },
];

function UploadPage() {
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
      <NavigationBar />
      <div className={styles.root}>
        <div className={styles.title}>
          <Title level={2}>Upload Video</Title>
        </div>

        <Form onSubmit={onSubmitHandler}>
          <div className={styles.contents}>
            {/* Drop Zone */}
            <Dropzone
              onDrop={onDropHandler}
              multiple={false}
              maxSize={9000000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div className={styles.dropZone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
          </div>
          <br />

          <label>Title</label>
          <Input
            onChange={videoTitleHandler}
            value={VideoTitle}
            style={{ marginBottom: "2rem" }}
          />
          <br />

          <label>Discription</label>
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

          <div className={styles.submitBtn}>
            <Button type="primary" size="large" onClick={onSubmitHandler}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UploadPage;