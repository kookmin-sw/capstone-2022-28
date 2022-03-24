import NavigationBar from "../components/Navbar/NavigationBar";

function MyAssetPage() {
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
        <h1>내 작품: 소유작, 좋아하는 작품</h1>
      </div>
    </div>
  );
}

export default MyAssetPage;
