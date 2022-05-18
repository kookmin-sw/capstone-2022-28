import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css"

function MyArtPage() {
  return (
    <div class="page">
      <LoginNavigationBar />
      <div class = "page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 class = "title">내 전시회</h1>
      </div>
    </div>
  );
}

export default Auth(MyArtPage, true);
