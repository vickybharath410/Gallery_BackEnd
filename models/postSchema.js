const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    label:{type:String,required:true},
    url:{type:String,required:true}
})

module.exports=mongoose.model("posts",postSchema);