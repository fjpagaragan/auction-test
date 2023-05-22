import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { secretKey } from '../config/token.config';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export interface TokenPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

export const auth = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }
    
        const decoded = jwt.verify(token, secretKey!);
        (req as CustomRequest).token = decoded;
    
        next();   
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
    }
}

export const decodeToken = async (authorization: string) => {
    const token = authorization.replace('Bearer ', '');

    const decoded = jwt.verify(token, secretKey!);
    
    return decoded;
}