const express=require("express");
const mongoose=require("mongoose");
const session=require("express-session");
const methodOverride=require("method-override");
require("dotenv").config();

const app=express();

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000
})
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err);
});

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(session({
 secret:process.env.SESSION_SECRET,
 resave:false,
 saveUninitialized:false
}));

app.use("/",require("./routes/auth"));
app.use("/",require("./routes/post"));

app.listen(3000,()=>{
 console.log("Server Running");
});