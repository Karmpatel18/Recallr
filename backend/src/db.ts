import { Schema , model } from "mongoose"
import mongoose from "mongoose";

export async function connectToDB(){
  const URL = process.env.DATABASE_URL;
  if (!URL) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }
  try {
    await mongoose.connect(URL);
    console.log("database connection successfully");
  } catch (e) {
    console.log(`failed to connect database ${e}`);
  }
}
connectToDB();


const UserSchema = new Schema({
    username: {type: String , unique: true},
    password: String
})

export const userModal = model("users", UserSchema)