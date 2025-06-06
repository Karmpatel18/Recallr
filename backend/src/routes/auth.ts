const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
import { userModal } from '../db'

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//@ts-ignore
router.post("/google", async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ message: "Invalid token payload" });
        }

        const { name, email, picture, sub } = payload;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // First try to find existing user
        let user = await userModal.findOne({ email });

        if (!user) {
            try {
                // Create new user with required fields
                user = await userModal.create({
                    name: name || email.split('@')[0], // Fallback to email username if name is not provided
                    email,
                    picture: picture || '', // Provide default empty string if picture is not available
                    googleId: sub,
                });
            } catch (createError: any) {
                console.error("Error creating user:", createError);
                
                // If it's a duplicate key error, try to find the user again
                if (createError.code === 11000) {
                    user = await userModal.findOne({ email });
                    if (!user) {
                        return res.status(500).json({ 
                            message: "Error creating user and user not found",
                            error: createError.message 
                        });
                    }
                } else {
                    return res.status(500).json({ 
                        message: "Error creating user",
                        error: createError.message 
                    });
                }
            }
        }

        if (!user) {
            return res.status(500).json({ message: "Failed to create or find user" });
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ 
            jwt: jwtToken, 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
    } catch (err) {
        console.error("Google auth error:", err);
        res.status(401).json({ 
            message: "Authentication failed",
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

module.exports = router;
