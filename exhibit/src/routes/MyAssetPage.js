import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";

function MyAssetPage() {
  return (
    <div>
      <LoginNavigationBar />
      <div class = "page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 class="title">내 작품: 소유작, 좋아하는 작품</h1>
      </div>
    </div>
  );
}

export default Auth(MyAssetPage, true);
