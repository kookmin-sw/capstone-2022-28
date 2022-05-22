const express = require("express")
const router = express.Router();
const Video = require('../models/video');
const Exhibition = require('../models/exhibition');
const User = require("../models/user");
const Token = require("../models/token");

const uniToChar = (split_list) =>{
    var char = ""
    for(var i=1; i<split_list.length;i++){
        char += String.fromCharCode(parseInt(split_list[i],16));
    }
    return char
}

//전시회 저장
router.post('/insert',async(req,res)=>{
    console.log(req.body);
    data_json = req.body;
    const find_userID = await User.findOne({
        where : {
            nick : data_json.nick
        }
    })

    const new_exhibit = await Exhibition.create({
        title : data_json.title,
        category : data_json.category,
        description : data_json.description,
        poster_url : data_json.posterUrl,
        user_id : find_userID.id,
        userNick : data_json.nick,

    })
    const video_url = data_json.videosUrl;
 
    console.log("video_url : ",video_url);
    console.log("titleList : ",video_url[0].titleList);
    console.log("descriptionList : ",video_url[0].descriptionList);


    for (var i=0; i<video_url.length; i++){
        const new_video = await Video.create({
            writer : find_userID.id,
            duration : "2week",
            url : video_url[i].Url, 
            exhibition_id : new_exhibit.id,
            title :  video_url[i].titleList,
            description :  video_url[i].descriptionList,
            tokenId : video_url[i].tokenList,
            userNick : data_json.nick,
        }) 
        console.log("new_video : ",new_video);

    }

    return_json = { 
        insert:"success"
    }
    console.log(return_json)
    return res.status(200).json(return_json);
})

router.get('/get_art',async(req,res)=>{
    console.log("====================get_art!~!~!!!~!~!~!~!~!~!~!~!~!~!~!~!!~!~~!!~!~")
    const category = req.header("category");
    const art_data = await Exhibition.findAll({
        where:{
            category: `${category}`
        }
    })
    console.log("art_data :", art_data)
    // console.log("createAt :", art_data[0].createAt)


    // for(var i=0; i<art_data.length;i++){
    //     console.log("art_data.createAt :", art_data[i].createAt)
    //     let art_date = art_data[i].createAt
    //     let now_date = new Date();
    //     let end_date = art_date.getMonth() + 1
    //     if(end_date < now_date){ //아직 게시 기간일때
    //         console.log(end_date,now_date)
    //     }
 
    // }

    
    return res.status(200).json(art_data);
})

router.get("/get_myart",async(req,res)=>{
    console.log("====================get My Art!!!!!!=========================")
    const nick = req.header("nick");
    const split_nick = nick.split("\\");

    const artist_data = await User.findOne({
        where :{
            nick:uniToChar(split_nick)
        }
    })
    console.log(artist_data.id)
    
    const art_data = await Exhibition.findAll({
        where:{
            user_id : artist_data.id
        }
    })
    console.log("art_data : ",art_data);

    return res.status(200).json(art_data);

     
}) 

router.get('/get_video',async(req,res)=>{ 
    console.log("~~~~~~~~~~~~~~get video~~~~~~~~~~~~~~~~~~~~~")

    const exhibit_id = req.header("exhibition");
    console.log("exhibit : ",exhibit_id)
    const videos = await Video.findAll({
        where:{
            exhibition_id : exhibit_id
        }
    })
    console.log(videos);
    return res.status(200).json(videos);

})

router.get('/buy_art',async(req,res)=>{
    console.log("!!!!!!!!!!!!buy하셨군요~?~?~?~?~?~?~?!!!!!!!!!!!!!!!!")
    const token_id = req.headers("tokenId")
    const nick = req.headers("nick")
    const select_art = await Video.findOne({
        where:{
            tokenId : token_id
        }
    })
    const now_user = await User.findOne({
        where:{
            nick : nick 
        }
    })
    const myart = await Token.create({
        tokenId : token_id,
        video_id : select_art.id,
        user_id : now_user.id
    })
}) 

router.get('/get_buying_art',async(req,res)=>{
    console.log("!!!!!!!!!!!!buy한 작품을 가져올꼐여~~~?~?~?~?~?~?~?!!!!!!!!!!!!!!!!")
    const nick = req.header("nick");
    const split_nick = nick.split("\\");
    let token_cnt = []

    const now_user = await User.findOne({
        where:{
            nick:uniToChar(split_nick) 
        }
    })
    const tokenList = await Token.findAll({
        where:{
            user_id : now_user.id
        }
    })
    for(var i =0; i<tokenList.length; i++){
        const now_art = tokenList[i];
        let id =  now_art.video_id;
        const video = await Video.findOne({
            where:{
                id : id
            }
        })
        token_cnt.push(video)
    }
    console.log("token_cnt : ",token_cnt)
    
    return res.status(200).json(token_cnt);

}) 
 
module.exports = router;
