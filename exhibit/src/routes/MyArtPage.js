import NavigationBar from "../components/Navbar/NavigationBar";

function MyArtPage() {
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
        <h1>내가 올린 작품</h1>
      </div>
    </div>
  );
}

export default MyArtPage;
