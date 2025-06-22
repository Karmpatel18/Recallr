import { Schema, Types, model } from "mongoose"
import mongoose from "mongoose";

export async function connectToDB() {
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

// Connect to database
connectToDB();

const UserSchema = new Schema({
    username: { type: String, unique: true , required: true },
    password: { type: String, required: true }
});

export const userModal = mongoose.models.User || mongoose.model('User', UserSchema);

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

export const Tag = model('Tag', tagSchema);

const contentTypes = ["video", "audio", "image", "article"]

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enums: [contentTypes], required: true },
  tags: [{ type: String, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export const contentModal = model('content', contentSchema);

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const linkModal = model('link', linkSchema);