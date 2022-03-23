import NavigationBar from "../components/Navbar/NavigationBar";

function LoginPage() {
  return (
    <div>
      <NavigationBar />
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
