
import dotenv from 'dotenv';
dotenv.config();
import { userModal , contentModal } from './db';
import express from "express"
import jwt from 'jsonwebtoken'
const cors = require("cors");
const app = express();
const port = process.env.PORT
import { authMiddleware } from './authMiddleware';


app.use(cors());

app.use(express.json());

app.post("/api/v1/signup", async(req,res) => {

    const { username , password } = req.body;
    
    try{
    await userModal.create({
        username: username,
        password: password 
    })
    res.json({
        message:"user signed up successfully"
    })
    }
    catch(e: any){
        if (e.code === 11000) {
            res.status(409).json({
                message:`user exists`
            })
        } else {
            res.status(500).json({
            message: `error occurred : ${e}`
            })
        }
    }
})
app.post("/api/v1/signin",async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await userModal.findOne({
        username,
        password
    })
    
    if( userExists ){
        const token = jwt.sign({
            id:userExists._id
            
        }, process.env.JWT_SECRET)
    
        res.status(200).send({
            token,
            userId:userExists._id
        })
    }
    else{
        res.status(403).send({
            message:"incorrect credentials"
        })
    }
})

app.get("/api/v1/content",authMiddleware, async (req,res) => {
    // @ts-ignore
    const userId = req.query.userId;
    
    const content = await contentModal.find({
        userId:userId
    }).populate("userId","username")

    const username = await userModal.findById(userId).select("username");

    res.json({
        content,
        username
    })
    
})

app.post("/api/v1/content", authMiddleware , async (req,res) => {
    const title = req.body.title;
    const link = req.body.link;
    const tag = req.body.tag;
    const type = req.body.type;

    await contentModal.create({
        //@ts-ignore
        userId:req.userId,
        title,
        link,
        tag,
        type
    })
    res.json({
        message:"content added"
    })
})

app.delete("/api/v1/content", authMiddleware ,async (req,res) => {
    const contentId = req.body.contentId;

    await contentModal.deleteMany({
        //@ts-ignore
        userId:req.userId,
        contentId
    })
    res.json({
        message:"deleted"
    })
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    });;