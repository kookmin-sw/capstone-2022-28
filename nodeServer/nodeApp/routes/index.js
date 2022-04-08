var express = require('express');
const User = require('../models/user');
const { isLoggedIn } = require('./middleware');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});
router.get('/get',async(req,res)=>{
  const users = await User.findAll()
  const result = []

  for (const user of users) {
    result.push({
      id: user.id,
      name: user.nick,
    })
  }

  res.send(result)

});

router.get('/get/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ where: { id: id } })

  if (user) {
    res.render('layout',{ id: user.id, nick: user.nick, email: user.email })
  } else {
    res.status(500).send('해당 유저를 찾을 수 없음')
  }
})

router.post('/get/:id/follow',isLoggedIn,async(req,res,next)=>{
  try{
    const user = await User.findOne({whrer:{id:req.user.id}});
    if(user){
      await user.addFollowing(parseInt(req.params.id,10));
      res.send('success');
    }else{
      res.status(404).send('no user');
    }
  }catch (error){
    console.error(error);
    next(error);
  }

});

router.get('/data',(req,res)=>{
  const data = {
      lastname : "dl",
      firstname : "wlrma"
  };
  res.json(data);
})


module.exports = router
