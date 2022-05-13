import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";
import "./page.css";

function ContestPage() {
  return (
    <div>
      <LoginNavigationBar />
      <div class="page"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 class="title">Art Wall</h1>
      </div>
    </div>
  );
}

export default Auth(ContestPage, true);
