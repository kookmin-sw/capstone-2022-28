import React from "react";
import { Modal } from "react-bootstrap";
import login_btn from "../Image/kakao_login.png";
import img from "../Image/img.png";
import styles from "./LoginModal.module.css";

function LoginModal(props) {
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
        <img src={login_btn} onClick={props.onHide} />
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
