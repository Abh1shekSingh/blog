
const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment:{
        type:String, 
        required:true, 
    },
    author:{
        type:String, 
        required:true, 
    },
    postId:{
        type:String, 
        required:true, 
    },
    userId: {
        type:String, 
        required:true
    }
},{timestamps:{ createdAt: 'addedAt', updatedAt: ' modifiedAt'}})

module.exports = mongoose.model("Comment", commentSchema)