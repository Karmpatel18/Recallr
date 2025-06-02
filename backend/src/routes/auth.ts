const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
import { userModal } from '../db'

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT);
//@ts-ignore
router.post("/google", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture, sub } = ticket.getPayload();

        let user = await userModal.findOne({ email });

        if (!user) {
            user = await userModal.create({
                name,
                email,
                picture,
                googleId: sub,
            });
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ jwt: jwtToken, user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;
