const express = require("express");
const Post=require("./models/postSchema")
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URL, () => console.log("Database Connected"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.get("/", async(req, res) => {
  try {
    const allPost=await Post.find();
    res.status(200).json({
        status:"Success",
        data:allPost
    })
  } catch (error) {
    res.status(400).json({
        status:"Failed",
        message:error.message
    })
  }
});
app.post('/add',async(req,res)=>{
    try {
        const newPost=await Post.create({
            label:req.body.label,
            url:req.body.url
        })
        res.status(201).json({
            status:"Success",
            data:newPost
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
    
})

app.delete("/:id",async(req,res)=>{
    try {
        const deletedPost=await Post.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            status:"Success",
            data:deletedPost
        })
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
  
})

app.listen("8000", () => console.log("Server Connected at 8000"));