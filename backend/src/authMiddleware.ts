import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req:Request , res: Response , next: NextFunction) => {
    const headers = req.headers["Authorization"];
    const decoded = jwt.verify(headers as string,process.env.JWT_SECRET);
    if (decoded){
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).send({
            message: "unauthorized user"
        })
    }
}