import { log } from 'console';
import express, { Request, Response} from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import authMiddleware from '../middleware/authMiddleware';

const userStore = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await userStore.index();
        res.send(users);
    } catch (err) {
        res.status(400)
        res.send(err)
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const user = await userStore.show(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(400)
        res.send(err)
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_digest: req.body.password,
        };

        const newUser = await userStore.create(user);

        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as jwt.Secret);

        res.send({token});

    } catch (err) {
        res.status(400);
        res.send(err);
    }

}
const login = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password_digest: req.body.password,
        };

        const loggedInUser = await userStore.authenticate(user);

        const token = jwt.sign({ user: loggedInUser}, process.env.TOKEN_SECRET as jwt.Secret);        
        res.send({token});
    } catch (err) {
        res.status(400)
        res.send(err)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', index, authMiddleware)
    app.get('/users/:id', show, authMiddleware)
    app.post('/user', create)
    app.post('/user/login', login)
}

export default user_routes