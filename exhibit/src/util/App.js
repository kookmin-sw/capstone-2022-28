import "./App.css";
import Auth from "./Auth";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const REST_API_KEY = "b978902c0e045f8489bcff34e3d15077";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1>
              <a href={KAKAO_AUTH_URL}>Kakao Login</a>
            </h1>
          </Route>
          <Route path="/oauth/kakao/callback">
            <Auth />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
