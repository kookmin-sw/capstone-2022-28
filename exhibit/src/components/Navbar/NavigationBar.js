import React from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import logo from "../Image/logo.png";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container fixed="top">
          <Navbar.Brand href="/">
            <img src={logo} className={styles.Logo}></img>
          </Navbar.Brand>
          <Nav className="me-auto">
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
          <Nav className="login">
            <Button href="/login">Login</Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
