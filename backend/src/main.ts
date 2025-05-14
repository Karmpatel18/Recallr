import express from "express"

const app = express();

app.get("/", function(req , res ) {
    let count:number = 0; 
    console.log("hi there ", count )
    count += 1;
})


app.listen(3000);