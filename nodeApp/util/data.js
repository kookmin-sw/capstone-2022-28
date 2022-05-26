const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.dbinput = async (data_json) => {
  try {
    const find_user = await User.findOne({
      where: { snsId: data_json.id, provider: "kakao" },
    });
    if (find_user) {
    } else {
      const new_user = await User.create({
        email: data_json.kakao_account.email,
        snsId: data_json.id,
        nick: data_json.properties.nickname,
        provider: "kakao",
      });

      const jwt_access_token = jwt.sign(
        {
          id: new_user.snsId,
          email: new_user.email,
        },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256", //해싱 알고리즘
          expiresIn: "10d", //토큰 유효기간
          issuer: "issuer", //발행자
        }
      );

      const jwt_refresh_token = jwt.sign(
        {
          id: new_user.snsId,
          email: new_user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30m", //토큰 유효기간
        }
      );

      const jwts = {
        jwt_access_token: jwt_access_token,
        jwt_refresh_token: jwt_refresh_token,
      };
      const return_json = {
        result: "create",
        tokens: jwts,
      };
      return return_json;
    }
  } catch (err) {
    console.log("ERROR");
    console.error(err);
  }
};
