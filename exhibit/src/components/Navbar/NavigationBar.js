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

function NavigationBar() {
  const [loginModal, setLoginModal] = useState(false);

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

            <NavDropdown title="내 컬렉션" className={styles.menu}>
              <NavDropdown.Item href="/my-collection">내 작품</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/my-art">내가 올린 작품</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <LoginModal show={loginModal} onHide={() => setLoginModal(false)} />

          <Button
            className={styles.loginBtn}
            onClick={() => {
              setLoginModal(true);
            }}
          >
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
