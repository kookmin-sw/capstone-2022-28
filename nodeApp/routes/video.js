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
    console.log("new_exhibit : ",new_exhibit);

    // const new_video =  await Video.create({

    // })

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
 
module.exports = router;
