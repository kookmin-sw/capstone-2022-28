import NavigationBar from "../components/Navbar/NavigationBar";

function ContestPage() {
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
        <h1>Art Wall</h1>
      </div>
    </div>
  );
}

export default ContestPage;
