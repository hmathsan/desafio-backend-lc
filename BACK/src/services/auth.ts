import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.JWT_SECRET

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split('');

        if(token.length < 2 || token[0] != 'Bearer') {
            return res.sendStatus(401);
        } else {
            jwt.verify(token[1], SECRET!, (e, _usuario) => {
                if (e) {
                    return res.sendStatus(403);
                }

                next();
            })
        }
    } else {
        res.sendStatus(401)
    }
}

export default authenticate;