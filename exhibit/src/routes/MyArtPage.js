import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

function MyArtPage() {
  return (
    <div>
      <LoginNavigationBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>내가 올린 작품</h1>
      </div>
    </div>
  );
}

export default Auth(MyArtPage, true);
