import { Order_Product, Order_Product_Store } from './../models/order-product';
import express, { Request, Response} from "express"
import authMiddleware from '../middleware/authMiddleware';

const order_product_Store = new Order_Product_Store()

const index = async (_req: Request, res: Response) => {
    try {
        const orderList = await order_product_Store.index();
        res.send(orderList);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
};
const create = async (req: express.Request, res: express.Response) => {
    try {
        const orderList: Order_Product = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        };

        const newOrderList = await order_product_Store.create(orderList);
        res.send(newOrderList);

    } catch (err) {
        res.status(400);
        res.send(err);
    }
}
const update = async (req: Request, res: Response) => {
    try {
        const orderList: Order_Product = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        };

        const updateOrderList = await order_product_Store.update(req.params.id, orderList);
        res.send(updateOrderList);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
}
const deleteOrder = async (req: Request, res: Response) => {
    try {
        const delete_list = await order_product_Store.delete(req.params.id);
        res.send(delete_list);
    } catch (err) {
        res.status(400)
        res.send(err);
    }
}
const getLists = async (req: Request, res: Response) => {
    try {
        const allLists = await order_product_Store.getLists(req.params.id);
        res.send(allLists);
    } catch (err) {
        res.status(400)
        .send(err);
    }
}
const order_product_routes = (app: express.Application) => {
    app.get("/order-product", index)
    app.post("/order-product/create",authMiddleware, create)
    app.put("/order-product/update/:id", authMiddleware, update)
    app.delete("/order-product/delete/:id", authMiddleware, deleteOrder)
    app.get("/order-product/list-all/:id", authMiddleware, getLists)

}

export default order_product_routes