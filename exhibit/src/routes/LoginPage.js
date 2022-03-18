import NavBar from "../components/Navbar";

function LoginPage() {
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Login</h1>
      </div>
    </div>
  );
}

export default LoginPage;
