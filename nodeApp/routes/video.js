const express = require("express")
const router = express.Router();
const Video = require('../models/video');
const Exhibition = require('../models/exhibition');


//전시회 저장
router.post('/insert',async(req,res)=>{
    console.log(req.body);
    data_json = req.body;
    const new_exhibit = await Exhibition.create({
        title : data_json.title,
        category : data_json.category,
        description : data_json.description,
        poster_url : data_json.posterUrl,
    })
    console.log(new_exhibit);

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
    // const data = art_data[0]
    // console.log(data)
    return res.status(200).json(art_data);
})
 
module.exports = router;
