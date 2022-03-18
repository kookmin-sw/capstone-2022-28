import React from "react";
import logo from "../Image/title.jpeg";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

export const NavBar = () => {
  return (
    <Nav>
      <NavLink to="/">
        <img src={logo} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/art-wall">Art Wall</NavLink>
        <NavLink to="/individual">개인전</NavLink>
        <NavLink to="/my-collection">내 컬렉션</NavLink>
        <NavLink to="/my-account">내 계정</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/login">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default NavBar;
