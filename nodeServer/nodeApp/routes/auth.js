
var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user')
const kakaoAuth = require('../util/kakaoAuth');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');
const {getAccessToken, getUserInfo} = require('../util/getToken');
const { dbinput } = require('../util/data');
// import LandingPage from "../routes/LandingPage";
// import LandingPage from ("../../../exhibit/src/routes/LandingPage.js")

//카카오로만 로그인할꺼면 굳이 필요X
// router.post('/join', async function(req, res, next) {
//     const {email,nick} = req.body;
//     try{
//         const exUser = await User.findOne({where:{email}});
//         if (exUser){ //이미 존재할 경우 error
//             return res.redirect('/join?error=exist');
//         }
//         await User.create({
//             email,
//             nick,
//         });
//         return res.redirect('/'); //나중에 정해줄 수 있음.
//     }
//    catch(error){
//        console.error(error);
//        return next(error);
//    }
// });

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logOut();
    req.session.destroy();
    res.redirect('/') //나중에 정해줄 수 있음.
})



// router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',async(req,res)=>{
    const code = req.query.code;
    console.log("code =====>",code)
    const option = {
        token_url : 'https://kauth.kakao.com/oauth/token',
        userInfoUrl : 'https://kapi.kakao.com/v2/user/me',
        code: code
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




router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/', //실패했을때 redirect할 곳
}),(req,res,next)=>{
    const code = req.query.code
    console.log("코드 : "+code)
    data = req.user;
    userId = data.id;
    console.log(data.id+`  ${userId}`)
    // next()
    // res.send(data);
    res.redirect(`http://localhost:8000/oauth/justData/${userId}`) //성공시 redirect할 곳
    // res.redirect("")
})


// router.post('/kakao', async (req, res) => {
//     try{
//         let userEmail = "";
//         let userNickName = "";
//         if (req.body.access_token) {
//         //초기 로그인
//             //getProfile => 토큰을 바탕으로 프로필 정보 받아오는 함수.
//             const result = await kakaoAuth.getProfile(req.body.access_token);
//             const kakaoUser = JSON.parse(result).kakao_account;
//             userEmail = kakaoUser.email;
//             userNickName = kakaoUser.profile.nickname;
//         } else {
//         //자동 로그인
//             const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {
//             ignoreExpiration: true,
//             });
//             userEmail = user.email;
//         }
      
//         const [user, created] = await User.findOrCreate({
//             where: { email: userEmail },
//             defaults: {
//             // kakaoToken: req.body.access_token,
//             nick: profile.displayName,
//             snsId:profile.id,
//             provider:'kakao',
//             }
//             // attributes: ['id', 'nickName'],

//         })
//         .spread((user,created)=>{
//             console.log(user.get({
//                 plain: true
//               }))
//             console.log(created)
//         })
  
//         let responseData = {
//             success: true,
//             user,
//         };
    
//         if (req.body.access_token) {
//             const token = jwt.sign({
//             id: user.id,
//             email: userEmail,
//             }, process.env.JWT_SECRET, {
//             issuer: 'bbangsoon',
//             });
//             responseData.jwt = token;
//         }
    
//         return res.status(created? 201: 200).json(responseData);
//     }catch (err) {
//       return res.status(500).json({
//         success: false,
//         error: err.toString(),
//       });
//     }
//   });


// router.get('/justData/:id',async(req,res)=>{
//     userId = req.params.id;
//     console.log(userId);
//     try{
//         await User.findOne({where:{id : userId}})
//             .then((user)=>{
//                 console.log(user)
//                 return res.json(user)
//         })
//     }catch (error){
//         console.error(error);
//         next('/justData/:id 오류' + error);
//     }
// })
// router.get('/token',)
 
module.exports = router;
