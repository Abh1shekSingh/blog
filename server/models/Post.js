
const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true, 
        unique:true
    },
    desc:{
        type:String, 
        required:true, 
    },
    photo:{
        type:String, 
        required:false
    },
    username:{
        type:String, 
        required:true, 
    },
    userId:{
        type:String, 
        required:true
    },
    categories:{
        type:Array,
    },
    
},{timestamps:{ createdAt: 'addedAt', updatedAt: ' modifiedAt'}})

module.exports = mongoose.model("Post", postSchema)