import { userModal } from './db';
import express from "express"

const app = express();
//  process.env.PORT;
const port = 3000;
console.log(port)

app.use(express.json());

app.get("/", function(req , res ) {
    res.json("hi from the home page")
})

app.post("/api/v1/signup", async(req,res) => {

    const username = req.body.username;
    const password = req.body.password;
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

app.post("/api/v1/signin", (req,res) => {

})

app.get("/api/v1/content", (req,res) => {

})

app.post("/api/v1/content", (req,res) => {

})


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
    });;