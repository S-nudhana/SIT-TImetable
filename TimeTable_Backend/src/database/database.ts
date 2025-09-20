import * as mysql from 'mysql2/promise';
import env from '../schemas/env.schema';

let connection: mysql.Connection | null = null;

export const connectDB = async (): Promise<mysql.Connection> => {
  if (connection) return connection;

  connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: Number(env.DB_PORT),
  });

  console.log('Database connected');
  return connection;
};

export default connectDB;