import NavigationBar from "../components/Navbar/NavigationBar";
import {Button} from "antd"
import {useNavigate} from "react-router-dom"

function LandingPage() {
  const navigate = useNavigate();

  const clickListener = () => {
    console.log(localStorage)
    // navigate("/http://localhost:8000/get/11")
  }

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
        <Button onClick={clickListener}>Button</Button>
      </div>
    </div>
  );
}

export default LandingPage;
