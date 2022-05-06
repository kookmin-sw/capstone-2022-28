import NavigationBar from "../components/Navbar/NavigationBar";
import Card from "../components/ArtList/Card";
import Layout from "../components/Layout";
import "../components/titleInPage.css";

function ArtPage() {
  return (
    <div>
      <NavigationBar />
      <body>
      <Layout>
        <h1 className = "pageTitle">개인전</h1>
      <Card />

      </Layout>
      </body>
     
    </div>
  );
}

export default ArtPage;
