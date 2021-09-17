const mongoose = require('mongoose');


const postSchema= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    body:{type:String ,required:true},
    date:{type:Date ,default:Date.now()},
    img:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    likesCounter:{type:Number},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
    commentsCounter:{type:Number},

});


module.exports=mongoose.model("Post",postSchema);

postSchema.post("updateOne", async function () {
    this.likesCounter = await likes.length;
})
