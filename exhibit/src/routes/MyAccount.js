import Auth from "../hoc/auth";
import LoginNavigationBar from "../components/Navbar/LoginNavigationBar";

function MyAccount() {
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
        <h1>내 계정</h1>
      </div>
    </div>
  );
}

export default Auth(MyAccount, true);
