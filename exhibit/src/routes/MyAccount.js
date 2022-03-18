import NavBar from "../components/Navbar";

function MyAccount() {
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
        <h1>내 계정</h1>
      </div>
    </div>
  );
}

export default MyAccount;
