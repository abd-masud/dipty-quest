import { connectionToDatabase } from '../../../db';
import { ResultSetHeader } from 'mysql2';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const requestBody = await request.json();
        const { company, firstName, lastName, email, contact, password, role } = requestBody;

        if (!company || !firstName || !lastName || !email || !contact || !password || !role) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const hashedPassword = await hash(password, 10);

        const db = await connectionToDatabase();

        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO `user` (company, first_name, last_name, email, contact, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [company, firstName, lastName, email, contact, hashedPassword, role]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'User registered successfully' }), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            throw new Error('Failed to insert user');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return new Response(JSON.stringify({ error: 'Failed to register user' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
