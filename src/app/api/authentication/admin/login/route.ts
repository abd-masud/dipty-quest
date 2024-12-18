import { connectionToDatabase } from '../../../db';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

interface Admin {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
}

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export async function POST(request: Request) {
    try {
        const requestBody: { email: string; password: string } = await request.json();

        if (!requestBody.email || !requestBody.password) {
            return new Response(JSON.stringify({ error: 'Email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<Admin[] & RowDataPacket[]>(
            'SELECT * FROM `admin` WHERE `email` = ?',
            [requestBody.email]
        );

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = rows[0];

        const isPasswordValid = await compare(requestBody.password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        return new Response(
            JSON.stringify({ token, user: userData }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Failed to authenticate user' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
