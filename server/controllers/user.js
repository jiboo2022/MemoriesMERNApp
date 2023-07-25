import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";



export const signin = async ( req, res)=>{
   
   const { email, password} = req.body;
  
    try {
         // check if user exist 
  const existingUser = await User.findOne( { email });

  // if user does not exist return error 404
  if(!existingUser) return res.status(404).json({ message:' user does not exist '});
  
  // compare  password in database with submited password 

  const isPasswordExist = await bcrypt.compare(password, existingUser.password)
   
  // return invalid if incorrect
  if(!isPasswordExist) return res.status(400).json({ message:'Invalid password'});

  // create token for user login on success 

  const token_id = jwt.sign({ email: existingUser.email, id:existingUser._id}, 'secretkey', {expiresIn:'1h' });

  // send message back to browser

  res.status(200).json({ result: existingUser, token_id })
        
    } catch (error) {
        res.status(500).json({ message:' something went wrong' })
        
    }


}

export const signup = async ( req, res)=>{

     const { email, password,firstname,lastname,confirmpassword } = req.body;     

    try {
         // check if user exist 
         const isuserexist = await User.findOne({ email})
        // if user exist return error 404   
       
        if(isuserexist) return res.status(404).json({message: 'Sorry user already exist ' });
        // compare if the pasword match
        if (password !== confirmpassword) return res.status(404).json({message: 'Password mismatch ' });
        // hash the password for security
         const hashedPassword  = await bcrypt.hash(password, 12);
         //create user
        const result = await User.create({ email, password: hashedPassword, userName:`${firstname} ${lastname}` });
          
        // create tokrn
        

        const token_id = jwt.sign({ email: result.email, id:result._id}, 'secretkey',{ expiresIn: "1h"});
       
        //if(token_id)return res.status(404).json({message: 'token created successfully ' });

        res.status(201).json({ result, token_id })

        
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error); 
    }


}