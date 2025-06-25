import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No or invalid authorization header" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        // @ts-ignore
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};