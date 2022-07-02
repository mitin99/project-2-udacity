import client from "../database";


export type Order_Product = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number
}

export class Order_Product_Store {
    async index(): Promise<Order_Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders_products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Can not get order list. Error: ${err}`)
        }
    }
    async create(order_product: Order_Product): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Error when create list of order ${order_product.order_id}. Error: ${err}`);
        }
    }
    async update(id: string, order_product: Order_Product): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql = `UPDATE orders_products SET order_id = $1, product_id = $2, quantity = $3 WHERE id=${id} RETURNING *;`;
            const result = await conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not update ${order_product.id}. Error: ${err}`);
        }
    }
    async delete(id: string): Promise<Order_Product> {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM orders_products WHERE id=${id} RETURNING *;`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not delete list ${id}. Error: ${err}`)
        }
    }
    async getLists(id: string): Promise<any> {
        try {
            const conn = await client.connect();
            const sql = `SELECT order_id, name, price, quantity, status FROM orders INNER JOIN orders_products ON id(orders)=order_id INNER JOIN products ON product_id=id(products) INNER JOIN users ON user_id=id(users) WHERE user_id=${id};`
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get all order. Error: ${err}`);
        }
    }
}