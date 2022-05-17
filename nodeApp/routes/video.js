const express = require("express")
const router = express.Router();
const Video = require('../models/video');
const Exhibition = require('../models/exhibition');

// router.get('/insert',(req,res)=>{
//     console.log(req);
    
//     return_json = {
//         insert:"success"
//     }
//     // console.log(return_json)
//     return res.status(200).json(return_json);
// })

router.post('/insert',async(req,res)=>{
    console.log(req.body);
    data_json = req.body;
    const new_video = await Exhibition.create({
        title : data_json.title,
        category : data_json.category,
        description : data_json.description,
        poster_url : data_json.posterUrl,
    })
    console.log(new_video);

    return_json = { 
        insert:"success"
    }
    console.log(return_json)
    return res.status(200).json(return_json);
})
 
module.exports = router;
