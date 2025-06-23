
import dotenv from 'dotenv';
dotenv.config();
import { userModal, contentModal, linkModal } from './db';
import express from "express"
import jwt from 'jsonwebtoken'
import { authMiddleware } from './authMiddleware';
const cors = require("cors");
const app = express();
const port = process.env.PORT

app.use(cors());

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {

    const { username, password } = req.body;

    try {
        await userModal.create({
            username: username,
            password: password
        })
        res.json({
            message: "user signed up successfully"
        })
    }
    catch (e: any) {
        if (e.code === 11000) {
            res.status(409).json({
                message: `user exists`
            })
        } else {
            res.status(500).json({
                message: `error occurred : ${e}`
            })
        }
    }
})
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await userModal.findOne({
        username,
        password
    })

    if (userExists) {
        const token = jwt.sign({
            id: userExists._id

        }, process.env.JWT_SECRET)

        res.status(200).send({
            token,
            userId: userExists._id
        })
    }
    else {
        res.status(403).send({
            message: "incorrect credentials"
        })
    }
})

app.get("/api/v1/content", authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.query.userId;

    const content = await contentModal.find({
        userId: userId
    }).populate("userId", "username");
    const username = await userModal.findById(userId).select("username");

    res.json({
        content,
        username,
    })

})

app.post("/api/v1/content", authMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
    const tags = req.body.tags;
    const type = req.body.type;

    await contentModal.create({
        //@ts-ignore
        userId: req.userId,
        title,
        link,
        tags,
        type
    })
    res.json({
        message: "content added"
    })
})

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await contentModal.deleteMany({
        //@ts-ignore
        userId: req.userId,
        contentId
    })
    res.json({
        message: "deleted"
    })
})


app.get("/api/v1/share/:id", authMiddleware, async (req, res) => {
    try{
    const shareHash = req.params.id;
    const shared = await linkModal.findOne({ shareHash });

    if (!shared) {
        res.status(404).json({ message: "Shared content not found" });
    }

    res.status(200).json({
        content: shared.content
    });
    }catch(e){
        res.status(404).json({
            message: "internal server Error"
        })
    }
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});;