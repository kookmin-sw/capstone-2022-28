import React, { useState } from "react";
import NavigationBar from "../components/Navbar/NavigationBar";
import Dropzone from "react-dropzone";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            marginTop: "7rem",
          }}
        >
          <Title level={2}>Upload Video</Title>
        </div>

        <Form onSubmit={onSubmitHandler}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Drop Zone */}

            <Dropzone
              onDrop={onDropHandler}
              multiple={false}
              maxSize={9000000000}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
          </div>
          <br />

          <label>Title</label>
          <Input onChange={videoTitleHandler} value={VideoTitle} />
          <br />

          <label>Discription</label>
          <TextArea onChange={descriptionHandler} value={Description} />
          <br />

          <select onChange={categoryHandler}>
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />

          <Button type="primary" size="large" onClick={onSubmitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadPage;
