import NavigationBar from "../components/Navbar/NavigationBar";

function LandingPage() {
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
        <h1>LandingPage</h1>
      </div>
    </div>
  );
}

export default LandingPage;
