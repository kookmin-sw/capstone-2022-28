import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

function ContestPage() {
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
        <h1>Art Wall</h1>
      </div>
    </div>
  );
}

export default Auth(ContestPage, true);
