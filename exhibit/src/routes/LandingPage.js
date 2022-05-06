import NavigationBar from "../components/Navbar/NavigationBar";
import {Button} from "antd"
import {useNavigate} from "react-router-dom"
import axios from "axios";


function LandingPage() {
  const navigate = useNavigate();

  const checkAuth = async(token) => {
    let header_token
    try{
      header_token = localStorage.getItem('access_token')
    }catch(err){
      header_token = ''
    }
    console.log(header_token)
    const res = await axios.get('http://localhost:8000/oauth/checkAuth',{
      headers:{
        Authorizations: `${header_token}`
      }
    })
    console.log(res)
    
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
        
        <Button onClick={checkAuth}>Button</Button>
      </div>
    </div>
  );
}

export default LandingPage;
