import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()

dotenv.config();

export default class Database {
    static connection: any;

    static async connect() {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
            console.log('Banco de dados MySQL conectado.');
        }
        return this.connection;
    }
}
