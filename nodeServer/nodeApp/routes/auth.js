var express = require('express');
const passport = require('passport');
var router = express.Router();
const User = require('../models/user')

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

router.get('/logout',(req,res)=>{
    req.logOut();
    req.session.destroy();
    res.redirect('/') //나중에 정해줄 수 있음.
})


//프론트단에서 처리 
router.get('/kakao',passport.authenticate('kakao'));

router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect:'/', //실패했을때 redirect할 곳
}),(req,res)=>{
    const code = req.query.code
    console.log("코드 : "+code)
    res.redirect('/') //성공시 redirect할 곳
})

router.get('/token',)

module.exports = router;
