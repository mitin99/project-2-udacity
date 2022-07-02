import client from "../database";

export type Order = {
    id?: number,
    user_id: number,
    status: string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Can not get orders. Error: ${err}`)
        }
    }
    async ordersByUser(id: string): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=$1;`;
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find any orders by user. Error: ${err}`)
        }
        
    }
    async show(id: string): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=$1;`;
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
        
    }
    async create(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;';
            const result = await conn.query(sql, [order.user_id, order.status]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can not order. Error: ${err}`);
        }
    }
}