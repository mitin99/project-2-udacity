import { Order, OrderStore } from "../models/order";
import express, { Request, Response} from "express"
import authMiddleware from "../middleware/authMiddleware";

const orderStore = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderStore.index();
        res.send(orders);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
};

const ordersByUser = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.ordersByUser(req.params.id);
        res.send(order);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.show(req.params.id);
        res.send(order);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status
        };

        const newOrder = await orderStore.create(order);
        res.send(newOrder);

    } catch (err) {
        res.status(400);
        res.send(err);
    }

}
const order_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/orders-by-user/:id', ordersByUser)
    app.get('/orders/:id', show)
    app.post('/order',authMiddleware, create)
}

export default order_routes