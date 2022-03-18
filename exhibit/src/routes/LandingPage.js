import NavBar from "../components/Navbar";

function LandingPage() {
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
        <h1>Homepage</h1>
      </div>
    </div>
  );
}

export default LandingPage;
