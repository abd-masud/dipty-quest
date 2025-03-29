import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;
let lastConnectionAttempt: number | null = null;

async function createNewPool() {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        connectTimeout: 10000,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
    });
}

export async function connectionToDatabase() {
    if (pool && pool.pool) {
        try {
            const testConn = await pool.getConnection();
            await testConn.ping();
            testConn.release();
            return pool;
        } catch (error) {
            console.warn('Existing pool failed, creating new one', error);
            pool = null;
        }
    }

    const now = Date.now();
    if (lastConnectionAttempt && (now - lastConnectionAttempt) < 5000) {
        throw new Error('Too frequent connection attempts');
    }
    lastConnectionAttempt = now;

    try {
        pool = await createNewPool();
        return pool;
    } catch (error) {
        console.error('Failed to create connection pool:', error);
        throw new Error('Database connection failed');
    }
}

export async function runQuery(query: string, params: any[] = []) {
    let connection;
    try {
        const pool = await connectionToDatabase();
        connection = await pool.getConnection();

        const [results] = await connection.query(query, params);
        return results;
    } catch (error) {
        console.error('Query failed:', error);
        throw error;
    } finally {
        if (connection) {
            try {
                connection.release();
            } catch (releaseError) {
                console.error('Failed to release connection:', releaseError);
            }
        }
    }
}

process.on('SIGINT', async () => {
    if (pool) {
        try {
            await pool.end();
            console.log('Connection pool closed gracefully');
        } catch (error) {
            console.error('Error closing connection pool:', error);
        }
    }
    process.exit(0);
});