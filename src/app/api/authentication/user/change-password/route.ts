import { connectionToDatabase } from '../../../db';
import { compare, hash } from 'bcryptjs';
import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        if (!requestBody.email || !requestBody.oldPassword || !requestBody.createNewPassword) {
            return new Response(JSON.stringify({ error: 'Email, old password and new password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [userRows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM `users` WHERE `email` = ?',
            [requestBody.email]
        );

        if (userRows.length === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = userRows[0];

        const isOldPasswordValid = await compare(requestBody.oldPassword, user.password);
        if (!isOldPasswordValid) {
            return new Response(JSON.stringify({ error: 'Old password is incorrect' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedNewPassword = await hash(requestBody.createNewPassword, 10);

        await db.query(
            'UPDATE `users` SET `password` = ? WHERE `email` = ?',
            [hashedNewPassword, requestBody.email]
        );

        return new Response(
            JSON.stringify({ message: 'Password updated successfully' }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        console.error('Error changing password:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to change password' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}