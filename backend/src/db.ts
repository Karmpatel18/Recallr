import { Schema , model } from "mongoose"
import mongoose from "mongoose";

async function connectDB(){
    try {
    await mongoose.connect(
      "mongodb+srv://karmpatel1203:karm9558@ineed.zrwxt.mongodb.net/secondBrain" // databaseNameHere
    );
    console.log("database connection successfully");
    } catch (e) {
    console.log(`failed to connect database ${e}`);
    }
}
connectDB(); 

const UserSchema = new Schema({
    username: {type: String , unique: true},
    password: String
})

export const userModal = model("users", UserSchema)