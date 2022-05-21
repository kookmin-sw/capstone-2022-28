const express = require("express")
const router = express.Router();
const Video = require('../models/video');
const Exhibition = require('../models/exhibition');
const User = require("../models/user");


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
            tokenId : video_url[i].tokenList
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

    return res.status(200).json(art_data);
})

router.get("/get_myart",async(req,res)=>{
    console.log("====================get My Art!!!!!!=========================")
    const nick = req.header("nick");
    const split_nick = nick.split("\\");

    const uniToChar = (split_list) =>{
        var char = ""
        for(var i=1; i<split_list.length;i++){
            char += String.fromCharCode(parseInt(split_nick[i],16));
        }
        return char
    }

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
 
module.exports = router;
