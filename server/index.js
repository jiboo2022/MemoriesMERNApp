import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import postRoutes from './routes/post.js';
import userLogin from './routes/user.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended:true}));
app.use(cors());

//const connect_url = "mongodb://localhost:27017/memories";
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
.then( ()=>app.listen(PORT, ()=> console.log(`Server running on port:${PORT}`)))
.catch( (error)=>console.log(error.message));

//mongoose.set('useFindAndModify', false);


app.use('/posts', postRoutes );
app.use('/user', userLogin )