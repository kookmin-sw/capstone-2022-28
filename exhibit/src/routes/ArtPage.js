import NavBar from "../components/Navbar";

function ArtPage() {
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
        <h1>개인전</h1>
      </div>
    </div>
  );
}

export default ArtPage;
