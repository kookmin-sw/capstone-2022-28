import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import logo from "../Image/logo.png";
import styles from "./NavigationBar.module.css";
import LoginModal from "../../routes/LoginModal/LoginModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginNavigationBar() {
  const [loginModal, setLoginModal] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} className={styles.Logo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className={styles.menu} href="/art-wall">
              Art Wall
            </Nav.Link>

            <Nav.Link className={styles.menu} href="/individual">
              개인전
            </Nav.Link>

            <Nav.Link className={styles.menu} href="/upload">
              업로드
            </Nav.Link>

            <NavDropdown title="내 컬렉션" className={styles.menu}>
              <NavDropdown.Item href="/my-collection">내 작품</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/my-art">내가 올린 작품</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav.Link className={styles.menu} href="/">
            (닉네임)님 지갑
          </Nav.Link>

          <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />

          <Button
            className={styles.loginBtn}
            // 혹시 axios 방법이 맘에 안드신다면 바꾸셔도 됩니다...
            onClick={() => {
              axios
                .get("http://3.39.32.4:8000/oauth/checkAuth")
                .then((response) => {
                  // 백엔드에서 DB에 저장된거 잘 지웠는지에 대한 응답...
                  if (response.data) {
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("isMember");
                    // localStorage.removeItem("nickName");
                    alert("로그아웃 되었습니다.");
                    navigate("/");
                  } else alert("로그아웃 실패...");
                });
            }}
          >
            Log Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LoginNavigationBar;
