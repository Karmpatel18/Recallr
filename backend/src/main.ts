import dotenv from 'dotenv';
dotenv.config();
import { userModal, contentModal, linkModal } from './db';
import express from "express"
import jwt from 'jsonwebtoken'
import { authMiddleware } from './authMiddleware';
const cors = require("cors");
const app = express();
const port = process.env.PORT
import axios from 'axios';
import fetch from 'node-fetch';
const { getTranscript } = require('youtube-transcript');

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

async function fetchYouTubeTranscript(url: string): Promise<string> {
    try {
        const videoIdMatch = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?&#]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) return '';
        const transcript = await getTranscript(videoId);
        return transcript.map((t: any) => t.text).join(' ');
    } catch (e) {
        return '';
    }
}

async function fetchTweetText(url: string): Promise<string> {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const match = html.match(/<meta property=\"og:description\" content=\"([^\"]+)\"/);
        return match ? match[1] : '';
    } catch (e) {
        return '';
    }
}

// Sync all user content to vector service (no enrichment, just metadata)
app.post('/api/v1/vector/sync', authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    try {
        const contents = await contentModal.find({ userId });
        for (const item of contents) {
            let mainText = `${item.title}\n${item.link}\n${item.type}\n${(item.tags || []).join(', ')}`;
            // No enrichment here!
            await axios.post('http://127.0.0.1:8001/add_content', {
                id: item._id.toString(),
                text: mainText,
                metadata: {
                    userId: item.userId.toString(),
                    link: item.link,
                    type: item.type,
                    title: item.title,
                    tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
                }
            });
        }
        res.json({ message: 'Synced all content to vector DB' });
    } catch (e) {
        console.error('Error syncing to vector service:', e);
        if(e instanceof Error){
            res.status(500).json({ message: 'Failed to query vector DB', error: e.message });
        }else{
            res.status(500).json({ message: 'Failed to sync content', error: 'Unknown error' });
        }
    }
});

// Query vector service for chat (enrichment happens here)
app.post('/api/v1/vector/query', authMiddleware, async (req, res) => {
    const { query, n_results } = req.body;
    // @ts-ignore
    const userId = req.userId;
    try {
        console.log('Querying vector service with:', { query, n_results });
        const response = await axios.post('http://127.0.0.1:8001/query', {
            query,
            n_results: n_results || 5
        });
        console.log('Vector service response:', response.data);
        // Filter results to only include user's content
        const docs = (response.data.documents && response.data.documents[0]) || [];
        const ids = (response.data.ids && response.data.ids[0]) || [];
        const metadatas = (response.data.metadatas && response.data.metadatas[0]) || [];
        let enriched_contexts = [];
        for (let i = 0; i < docs.length; i++) {
            const meta = metadatas[i] || {};
            let context = docs[i];
            const link = meta.link || '';
            if (meta.type === 'video' && link.includes('youtube.com')) {
                const transcript = await fetchYouTubeTranscript(link);
                if (transcript) context += `\nTranscript: ${transcript}`;
            }
            if ((meta.type === 'article' || meta.type === 'tweet') && link.includes('twitter.com')) {
                const tweet = await fetchTweetText(link);
                if (tweet) context += `\nTweet: ${tweet}`;
            }
            enriched_contexts.push(context);
        }
        const final_context = enriched_contexts.join('\n---\n');
        // Send to Python LLM service
        const llmResponse = await axios.post('http://127.0.0.1:8001/llm', {
            context: final_context,
            question: query
        });
        res.json({ answer: llmResponse.data.answer, context: final_context, raw_results: response.data });
    } catch (e) {
        console.error('Error querying vector service:', e);
        if(e instanceof Error){
            res.status(500).json({ message: 'Failed to query vector DB', error: e.message });
        }else{
            res.status(500).json({ message: 'Failed to query vector DB', error: 'Unknown error' });
        }
    }
});

// app.get("/api/v1/share/:id", authMiddleware, async (req, res) => {
//     try{
//     const shareHash = req.params.id;
//     const shared = await linkModal.findOne({ shareHash });

//     if (!shared) {
//         res.status(404).json({ message: "Shared content not found" });
//     }

//     res.status(200).json({
//         content: shared.content
//     });
//     }catch(e){
//         res.status(404).json({
//             message: "internal server Error"
//         })
//     }
// })

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});;