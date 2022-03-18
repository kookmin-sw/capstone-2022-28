import NavBar from "../components/Navbar";

function MyAssetPage() {
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
        <h1>내 컬렉션</h1>
      </div>
    </div>
  );
}

export default MyAssetPage;
