import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function (SpecificComponent, option) {
  function AuthenticationCheck() {
    const navigate = useNavigate();

    useEffect(async () => {
      let header_token;
      try {
        header_token = localStorage.getItem("access_token");
      } catch (err) {
        header_token = "";
      }
      console.log(header_token);
      const res = await axios.get("http://3.39.32.4:8000/oauth/checkAuth", {
        headers: {
          Authorizations: `${header_token}`,
        },
      });
      console.log(res);

      // 로그인 되지 않은 상태
      if (!res.data.isAuth) {
        // 회원들만 접근 가능할 때
        if (option) {
          alert("로그인해야합니다!");
          navigate("/");
        }
      }
      // 로그인 된 상태
      else {
        // 로그인되지 않은 상태서만 가능할 때
        if (!option) navigate("/");
      }
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
