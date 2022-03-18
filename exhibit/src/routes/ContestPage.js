import NavBar from "../components/Navbar";

function ContestPage() {
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
        <h1>Art Wall</h1>
      </div>
    </div>
  );
}

export default ContestPage;
