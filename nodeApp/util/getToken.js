const { default: axios } = require("axios");

exports.getAccessToken = async (code) => {
  try {
    const token_url = "https://kauth.kakao.com/oauth/token";
    const data = {
      grant_type: "authorization_code", //특정 스트링
      client_id: "b978902c0e045f8489bcff34e3d15077",
      client_secret: "Dr6ZGgZvRiwbwmfFAdAB9aZHt8sgwMsQ",
      redirect_uri: "http://localhost:3000/oauth/kakao/callback",
      code: code,
    };
    const query = `grant_type=${data.grant_type}&client_id=${data.client_id}&redirect_uri=${data.redirect_uri}&code=${code}`;
    return await axios.post(`${token_url}?${query}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  } catch (e) {
    console.error("error", e);
  }
};

exports.getUserInfo = async (url, access_token) => {
  try {
    return await axios(url, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (e) {
    console.error("error", e);
  }
};
