import mysql from 'mysql2/promise';

let connection: mysql.Connection;

export async function GET() {
    try {
        if (!connection) {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }

        return new Response(
            JSON.stringify({
                status: 'success',
                connectionDetails: connection,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        // const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

        return new Response(
            JSON.stringify({
                status: 'error',
                message: error,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
