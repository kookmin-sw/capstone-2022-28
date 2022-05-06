
var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user')
const kakaoAuth = require('../util/kakaoAuth');
const {getAccessToken, getUserInfo} = require('../util/getToken');
const { dbinput, jwtVerify } = require('../util/data');
// import LandingPage from "../routes/LandingPage";
// import LandingPage from ("../../../exhibit/src/routes/LandingPage.js")


router.get('/logout',(req,res)=>{
    req.logOut();
    req.session.destroy();
    res.redirect('/') //나중에 정해줄 수 있음.
})



router.get('/kakao/callback',async(req,res)=>{
    const code = req.query.code;
    console.log("code =====>",code)
    const option = {
        token_url : 'https://kauth.kakao.com/oauth/token',
        userInfoUrl : 'https://kapi.kakao.com/v2/user/me',
        code: code
    }
    const header_token = req.header('Authorizations')


    if (header_token != 'null'){ //이미 로그인한 전적이 있는 브라우저 ->db저장필요 없음
        console.log(header_token)
        return_json = jwtVerify(header_token)
        return res.json(return_json)
    }

    const token = await (await getAccessToken(code)).data;
    // console.log(token.access_token);
    const userInfo = await (await getUserInfo(option.userInfoUrl, token.access_token)).data;
    console.log(userInfo)
    console.log(userInfo.kakao_account.email)
    console.log(userInfo.id)
    console.log(userInfo.properties.nickname)

    const dbUser = await(dbinput(userInfo))
    console.log(dbUser)
    return res.status(200).json(dbUser) 
})

router.get("/checkAuth",(req,res)=>{
    try{
        token = req.header('Authorizations')
        result = token.slice(1,-1)
        console.log(result)
        let decoded = jwt.verify(result,process.env.JWT_SECRET);
        console.log(decoded)

        const return_json = {
            "isAuth" : true,
        }
        // console.log(return_json)
        return res.status(200).json(return_json) 

    } catch(err){
        if (err.message === 'jwt expired') {
            console.log('expired token');
            result = "TOKEN_EXPIRED";
        } else if (err.message === 'invalid token') { 
            console.log('invalid token');
            result = "TOKEN_INVALID"; 
        } else {
            console.log("another error");  
            result = "another error"; 
        }
        const return_json = {
            "isAuth" : false,
        }
        return res.status().json(return_json)

}
})




 
module.exports = router;
