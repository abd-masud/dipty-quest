import { connectionToDatabase } from '../../../db';
import { ResultSetHeader } from 'mysql2';
import { hash } from 'bcryptjs';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const { name, email, password, role } = requestBody;

        if (!name || !email || !password || !role) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `admin` WHERE `email` = ?', [email]);

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify({ error: 'Email already in use' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await hash(password, 10);

        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO `admin` (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        if (result.affectedRows === 1) {
            return new Response(
                JSON.stringify({ message: 'Admin registered successfully' }),
                {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } else {
            throw new Error('Failed to insert admin');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to register admin' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
