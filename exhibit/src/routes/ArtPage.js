import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";
import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

function ArtPage() {
  return (
    <div>
      <LoginNavigationBar />
      <body>
        <Layout>
          <h1 className="pageTitle">개인전</h1>
          <Card />
        </Layout>
      </body>
    </div>
  );
}

export default Auth(ArtPage, true);
