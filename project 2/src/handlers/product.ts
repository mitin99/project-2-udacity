import express, { Request, Response } from "express";
import { ProductStore, Product } from "../models/product";
import dotenv from 'dotenv'
import verifyAuthToken from "../middleware/authMiddleware";
import authMiddleware from "../middleware/authMiddleware";

dotenv.config()
const productStore = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const allProducts = await productStore.index();
        res.send(allProducts)
        
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const product = await productStore.show(req.params.id);
        res.send(product);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newProduct = await productStore.create(product);
        res.send(newProduct);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const products_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/product', authMiddleware, create)
}

export default products_routes