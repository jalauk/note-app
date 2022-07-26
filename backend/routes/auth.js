const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'jalaukisname'

//Creating a user
router.post('/createuser',[body('name').isLength({ min: 5 }),
body('email').isEmail(),
body('password').isLength({ min: 5 }),],
async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    let user = await User.findOne({email:req.body.email})
    if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
    }

    let salt =await bcrypt.genSalt(10)
    let secPass = await bcrypt.hash(req.body.password,salt)

    user =  await User.create({
        name : req.body.name,
        email: req.body.email,
        password:secPass,
      })

      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
      
      res.json({authtoken})

    }
    catch(err){
      console.log(err)
      res.status(500).send(err)
    }
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error:'please enter a unique value for email',message:err.message})})    
})


//Authenticating a user using : POST "/api/auth/login" . No login required
router.post('/login',[
body('email').isEmail(),
body('password').exists()
],async(req,res) => {
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  const {email,password} = req.body;
  try{
    let user =await User.findOne({email})
    if(!user){
      return res.status(400).json({error : "please try to login with correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({error : "please try to login with correct credentials"})
    }

    const userinfo = {
     
        id:user.id,
        email:user.email,
        name:user.name
      
    }
    const cookieData = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(cookieData,JWT_SECRET)
    res.cookie('auth', authtoken);
    res.json({userinfo})

  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }

})


// logged in users
router.post('/getuser',fetchuser,async(req,res) => {

    try {
      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
  })


module.exports = router