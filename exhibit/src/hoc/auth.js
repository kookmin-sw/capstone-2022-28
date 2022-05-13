import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function (SpecificComponent, option) {
  function AuthenticationCheck() {
    const navigate = useNavigate();

    useEffect(async () => {
      let header_token;
      let refresh_token;
      try {
        header_token = localStorage.getItem("access_token");
        refresh_token = localStorage.getItem("refresh_token");
      } catch (err) {
        header_token = "";
        refresh_token = "";
      }
      console.log(header_token);
      const res = await axios.get("http://3.39.32.4:8000/oauth/checkAuth", {
        headers: {
          Authorizations: `${header_token}`,
          refresh: `${refresh_token}`,
        },
      });
      console.log(res);
      // 로그인된 상태인지 매 페이지마다 로컬에 업데이트
      localStorage.setItem("isMember", res.data.isAuth);
      localStorage.setItem("nick", res.data.nick);

      // 로그인 되지 않은 상태
      if (!res.data.isAuth) {
        // 회원들만 접근 가능할 때
        if (option) {
          localStorage.removeItem("isMember");
          localStorage.removeItem("nick");
          navigate("/");

          alert("로그인해야합니다!");
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
