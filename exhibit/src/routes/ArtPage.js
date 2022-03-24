import NavigationBar from "../components/Navbar/NavigationBar";

function ArtPage() {
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
        <h1>개인전</h1>
      </div>
    </div>
  );
}

export default ArtPage;
