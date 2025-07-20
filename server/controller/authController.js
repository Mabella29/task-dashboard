const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Model/User')

//signup logic

exports.signup = async(req,res) =>{
    //grab the user inputs
    const {email,password} = req.body;

    //yo mongoDB, do we already have this email, if yes,block 'em
    const userExists =  await User.findOne({email})
    if(userExists) return res.status(400).json({message:"User already exists"})

    // if the mf doesn't exists, continue to
    // hash the password so that a hacker can read it
    const hashed = await bcrypt.hash(password, 10)
    //save the user
    const user = await User.create({email, password:hashed})

    //attach a token to the user
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
    res.json({token})
    
}

// login logic

exports.login = async (req,res)=>{
    // yo mongoDB this user is claiming they already have account
    // make sure they're not lying
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(404).send("User not found")

    // compare if they gave the right password

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch) return res.status(401).send("Invalid password")

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
    res.json({token})
    
}