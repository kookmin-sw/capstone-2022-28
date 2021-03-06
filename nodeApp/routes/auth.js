var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();
const User = require("../models/user");

const { getAccessToken, getUserInfo } = require("../util/getToken");
const { dbinput, jwtVerify } = require("../util/data");
const { default: axios } = require("axios");

//탈퇴개념
router.get("/logout", async (req, res) => {
  token = req.header("Authorizations");
  result = token.slice(1, -1);
  let decoded = jwt.verify(result, process.env.JWT_SECRET);

  const id = decoded.id;
  await User.destroy({
    where: { snsId: `${id}` },
  });
  res.send({ signOut: "success" });
});

router.get("/kakao/callback", async (req, res) => {
  const code = req.query.code;
  const option = {
    token_url: "https://kauth.kakao.com/oauth/token",
    userInfoUrl: "https://kapi.kakao.com/v2/user/me",
    code: code,
  };
  const header_token = req.header("Authorizations");

  if (header_token != "null") {
    //이미 로그인한 전적이 있는 브라우저 ->db저장필요 없음
    // return_json = await axios.get("http://localhost:8000/oauth/checkAuth", {
    return_json = await axios.get("http://3.39.32.4:8000/oauth/checkAuth", {
      headers: {
        Authorizations: `${header_token}`,
        refresh: `${refresh_token}`,
      },
    });
    return res.json(return_json);
  }

  const token = await (await getAccessToken(code)).data;
  const userInfo = await (
    await getUserInfo(option.userInfoUrl, token.access_token)
  ).data;

  const dbUser = await dbinput(userInfo);

  return res.status(200).json(dbUser);
});

router.get("/checkAuth", (req, res) => {
  try {
    access = req.header("Authorizations");
    refresh = req.header("refresh_token");
    result = access.slice(1, -1);
    let decoded = jwt.verify(result, process.env.JWT_SECRET);

    const id = decoded.id;

    User.findOne({
      where: { snsId: `${id}` },
    })
      .then((user) => {
        if (user) {
          const nick = user.nick;
          return nick;
        } else {
          console.log("유저 없음 ===> 에러");
          const nick = "";
          return nick;
        }
      })
      .then((nickname) => {
        const return_json = {
          isAuth: true,
          nick: nickname,
        };
        return res.status(200).json(return_json);
      });
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log("expired token");
      console.log(decoded);
      result = "TOKEN_EXPIRED";
    } else if (err.message === "invalid token") {
      console.log("invalid token");
      result = "TOKEN_INVALID";
    } else {
      console.log("another error");
      console.log(err);
      result = "another error";
    }
    const return_json = {
      isAuth: false,
    };
    return res.status(200).json(return_json);
  }
});

module.exports = router;
