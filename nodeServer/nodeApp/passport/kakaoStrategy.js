const kakaoStrategy = require('passport-kakao').Strategy;
const passport = require('passport');

const User = require('../models/user');

module.exports = () =>{
    passport.use(new kakaoStrategy({
        clientID:'b978902c0e045f8489bcff34e3d15077',
        callbackURL:'http://localhost:8000/oauth/kakao/callback',
    }, async(accessToken,refreshToken,profile,done) =>{
        console.log("access Token입니다!!!!! : "+accessToken);
        console.log("refresh Token입니다!!!!! : "+refreshToken);
        console.log(profile);
        try{
            const exUser = await User.findOne({
                where:{snsId:profile.id, provider:'kakao'},
            })
            if(exUser){
                console.log("이미 존재하는 유저입니다.!!!!!!!!!!!!!!!!!!!!")
                done(null,exUser)
            }else{
                const newUser = await User.create({
                    email:profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId:profile.id,
                    provider:'kakao',
                });
            done(null,newUser)
            }
        } catch(error){
            console.error(error);
            done(error)
        }
    }
    ))
}