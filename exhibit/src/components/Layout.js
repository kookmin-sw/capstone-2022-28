import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 90px; /* 헤더 높이 */
`;

const Layout = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Layout;
