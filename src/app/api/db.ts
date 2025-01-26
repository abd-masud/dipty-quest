import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export async function connectionToDatabase() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            keepAliveInitialDelay: 10000,
            enableKeepAlive: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }
    return pool;
}

export async function runQuery(query: string, params: any[] = []) {
    const pool = await connectionToDatabase();
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(query, params);
        return results;
    } finally {
        connection.release();
    }
}
