import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBalance } from "../api/UserCaver";
import WalletModal from "../routes/WalletModal/WalletModal";

let addressW= localStorage.getItem("addressW");


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
      // const res = await axios.get("http://localhost:8000/oauth/checkAuth", {
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
      localStorage.setItem("addressW", addressW);
      console.log("addressW : ",addressW)

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

      if(localStorage.getItem("addressW") === "null" && option){
        alert("지갑을 연동해주세요")
        navigate("/")
      }
      else{
        const _balance = await getBalance(addressW);
        console.log("_balance : ",_balance)
        WalletModal.setBal(_balance)
      }
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
