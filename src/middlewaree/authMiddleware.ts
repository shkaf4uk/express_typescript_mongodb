import {NextFunction, Request, Response} from 'express'
import jwt from "jsonwebtoken";
import {configs} from "../config";

declare module 'express' {
    interface Request {
        [key: string]: any
    }
}

export default function (req: Request, res:Response, next:NextFunction) {
    if (req.method === 'OPTIONS') next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) return res.status(403).json({message: 'User not authorized'})
        req.user = jwt.verify(token, configs.secret)
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'User not authorized'})
    }
}
