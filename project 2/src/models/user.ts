import client from "../database";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password_digest: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';

            const result = await conn.query(sql);

            conn.release();
            return result.rows; 
        } catch (err) {
            throw new Error(`Can not find any user. Error: ${err}`)
        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            let sql = `SELECT * FROM users WHERE id=$1;`;

            let result = await conn.query(sql, [id]);
            const user = result.rows[0];

            conn.release()
            return user;
        } catch (err) {
            throw new Error(`Can not find user ${id}. Error: ${err}`)
        }
    }
    async create(u: User): Promise<User> {
        try {
          //@ts-ignore
          const conn = await client.connect();
          const sql =
            'INSERT INTO users (firstName,lastName,password_digest) VALUES($1,$2,$3) RETURNING *;';
          const hash = bcrypt.hashSync(
            u.password_digest + pepper,
            parseInt(saltRounds as string)
          );
    
          const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
          const user = result.rows[0];
    
          conn.release();
          return user;
        } catch (err) {
          throw new Error(`unable create user (${u.firstName} ${u.lastName}): ${err}`);
        }
      }
      async authenticate(u: User): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM users WHERE firstName = $1 AND lastName = $2;`;

            const result = await conn.query(sql, [u.firstName, u.lastName]);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                
                if (bcrypt.compareSync(u.password_digest + pepper, user.password_digest)) {
                    return user;
                }
            }
            throw new Error("couldn't find user");

        } catch (err) {
            throw new Error(`Could not authenticate user ${u.firstName} ${u.lastName}. Error: ${err}`)
        }
    }
}