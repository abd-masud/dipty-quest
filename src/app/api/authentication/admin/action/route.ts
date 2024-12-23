import { ResultSetHeader } from 'mysql2';
import { connectionToDatabase } from '../../../db';
import { hash } from 'bcryptjs';
import { NextRequest } from 'next/server';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export async function POST(request: NextRequest) {
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
    } catch {
        return new Response(
            JSON.stringify({ error: 'Failed to register admin' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const role = url.searchParams.get('role');

        const db = await connectionToDatabase();

        let query = 'SELECT * FROM `admin`';
        const params = [];

        if (role) {
            query += ' WHERE `role` = ?';
            params.push(role);
        }

        const [rows] = await db.query(query, params);

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No admins found for the specified role' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch admins' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id, name, email, password, role } = await request.json();

        if (!id || !name || !email || !password || !role) {
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

        const [existingAdmin] = await db.query('SELECT * FROM `admin` WHERE `id` = ?', [id]);
        if (Array.isArray(existingAdmin) && existingAdmin.length === 0) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await hash(password, 10);

        const [result] = await db.query<ResultSetHeader>(
            'UPDATE `admin` SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
            [name, email, hashedPassword, role, id]
        );

        if (result.affectedRows === 1) {
            return new Response(
                JSON.stringify({ message: 'Admin updated successfully' }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'Failed to update admin' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch {
        return new Response(
            JSON.stringify({ error: 'Failed to update admin' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing admin ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [existingAdmin] = await db.query('SELECT * FROM `admin` WHERE `id` = ?', [id]);
        if (Array.isArray(existingAdmin) && existingAdmin.length === 0) {
            return new Response(JSON.stringify({ error: 'Admin not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const [result] = await db.query<ResultSetHeader>('DELETE FROM `admin` WHERE id = ?', [id]);

        if (result.affectedRows === 1) {
            return new Response(
                JSON.stringify({ message: 'Admin deleted successfully' }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'Failed to delete admin' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }
    } catch {
        return new Response(
            JSON.stringify({ error: 'Failed to delete admin' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
