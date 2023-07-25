import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

export const getPost = async (req, res)=>{

    try {

        //res.send('Router Conection working fine from controllers');
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        
    } catch (error) {
      res.status(404).json({ message:error.message })  
    }
    
}

export const createPost = async (req, res)=>{

     const userid = req.userId;
   if(!userid) return res.status(400).json({ message:'Login information not found'}) 
   const post = req.body;

   const newPost = new PostMessage({...post, creator: userid, createdAt:new Date().toISOString()})
    
  
  try {

    const newpost =  await newPost.save();
      res.status(201).json(newpost);
      console.log(newpost);
    
  } catch (error) {
    res.status(409).json({ message:error.message }) 
  }
}

export const updatePost = async (req, res) =>{
  
   const {id:_id} = req.params;
   const post = req.body;
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with id');

   const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, {new: true})

   res.json(updatePost);


}

export const deletePost = async (req, res)=>{

  const {id: _id }= req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with id');

  const deletepost =  await  PostMessage.findByIdAndDelete(_id);
    res.json({ message: 'post has been removed from database'})
    //res.json(deletepost);

}

  export const likePost = async (req, res)=>{

    const {id: _id} = req.params;
  // get the req.userId from auth middleware 

     const userid = req.userId;
     if (!userid) return res.json({ message:' Un authenticated'});
         
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with id');

     const post = await PostMessage.findById(_id);
     
     // check if the user id id present in the like array field in the datacase
     
     const index =  post.likes.findIndex( (id)=> id === String(userid));

     if(index === -1){
      // if id does not exist add it to likes
      post.likes.push(userid)
     }else{
      // 
      post.likes = post.likes.filter( (id) =>id  !== String(userid))
     }

      const updateLikes = await PostMessage.findByIdAndUpdate(_id, post, {new: true});

      res.json(updateLikes);

     


  }