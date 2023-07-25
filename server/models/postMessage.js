import mongoose from "mongoose";


const postSchema = mongoose.Schema({
   title:'String',
   message:'String',
   name:'String',
   creator:'String',
   tags:['string'],
   selectedFile: 'String',
   likes:{
    type:[String],
    default:[]
   },
   createdAt:'String'
})

const PostMessage = mongoose.model('PostMessage',postSchema );

export default PostMessage;