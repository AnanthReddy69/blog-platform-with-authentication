const express=require("express");
const Post=require("../models/post");
const Comment=require("../models/comment");

const router=express.Router();

router.get("/dashboard",async(req,res)=>{
 const posts=await Post.find();
 res.render("dashboard",{posts});
});

router.get("/create",(req,res)=>{
 res.render("create");
});

router.post("/create",async(req,res)=>{
 await Post.create({
  title:req.body.title,
  content:req.body.content,
  author:req.session.user.username
 });

 res.redirect("/dashboard");
});

router.get("/post/:id",async(req,res)=>{
 const post=await Post.findById(req.params.id);
 const comments=await Comment.find({
  postId:req.params.id
 });

 res.render("post",{post,comments});
});

router.post("/comment/:id",async(req,res)=>{
 await Comment.create({
  postId:req.params.id,
  username:req.session.user.username,
  comment:req.body.comment
 });

 res.redirect("/post/"+req.params.id);
});

router.get("/edit/:id",async(req,res)=>{
 const post=await Post.findById(req.params.id);
 res.render("edit",{post});
});

router.put("/edit/:id",async(req,res)=>{
 await Post.findByIdAndUpdate(
 req.params.id,
 req.body
 );

 res.redirect("/dashboard");
});

router.delete("/delete/:id",async(req,res)=>{
 await Post.findByIdAndDelete(req.params.id);
 res.redirect("/dashboard");
});

module.exports=router;