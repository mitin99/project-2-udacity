import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token= req.headers.authorization as string;
        if (!token) {
            throw new Error("token is missing");
        }
        const newToken = token.split(' ')[1];
        res.locals.decoded = jwt.verify(newToken, process.env.TOKEN_SECRET as Secret);
        next();
    } catch (err) {
        res.status(400)
        res.send(err)
    }
}

export default authMiddleware;