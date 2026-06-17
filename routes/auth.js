const express=require("express");
const bcrypt=require("bcryptjs");
const User=require("../models/user");

const router=express.Router();

router.get("/register",(req,res)=>{
 res.render("register");
});

router.post("/register",async(req,res)=>{
 const hash=await bcrypt.hash(req.body.password,10);

 await User.create({
  username:req.body.username,
  email:req.body.email,
  password:hash
 });

 res.redirect("/login");
});

router.get("/login",(req,res)=>{
 res.render("login");
});

router.post("/login",async(req,res)=>{
 const user=await User.findOne({email:req.body.email});

 if(!user) return res.send("User not found");

 const match=await bcrypt.compare(
 req.body.password,
 user.password
 );

 if(!match) return res.send("Wrong Password");

 req.session.user=user;

 res.redirect("/dashboard");
});

module.exports=router;