import React, { useEffect } from "react";
import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import "./page.css";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function ArtPage() {
  

  return (
    <div class="page">
      <LoginNavigationBar />
      <body class="page">
        <Layout>
          <h1 className="pageTitle">개인전</h1>
          <Card />
        </Layout> 
      </body>
    </div>
  );
}

export default Auth(ArtPage, true);
