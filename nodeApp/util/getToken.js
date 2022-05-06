// const { options } = require("../routes");

const { default: axios } = require("axios")
const qs = require('qs');
// const fetch = require('node-fetch');


exports.getAccessToken = async (code) => {
    try {
            const token_url ='https://kauth.kakao.com/oauth/token'
            const data ={
                grant_type: 'authorization_code',//특정 스트링
                client_id: "b978902c0e045f8489bcff34e3d15077",
                client_secret: "Dr6ZGgZvRiwbwmfFAdAB9aZHt8sgwMsQ",
                redirect_uri: "http://localhost:3000/oauth/kakao/callback",
                code: code,
            };
            const query = `grant_type=${data.grant_type}&client_id=${data.client_id}&redirect_uri=${data.redirect_uri}&code=${code}`;
            return await axios.post(`${token_url}?${query}`, {
                headers: {
                //     Accept: "application/json",
                //     'User-Agent': 'Super Agent/0.0.1',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                
            })
            // .then((res) => {
            //     console.log(res.data)
                
            //     // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
            // })
    }catch(e) {
        console.error("error", e);
    }
};

exports.getUserInfo = async (url, access_token) => {
    try {
        return await axios(url, { 
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${access_token}`
            } 
        })
        // .then(res => res.json());
    }catch(e){
        console.error("error", e);
    }
};

// module.exports