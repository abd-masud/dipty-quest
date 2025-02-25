import { connectionToDatabase } from '../../../db';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2';

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        if (!requestBody.email || !requestBody.password) {
            return new Response(JSON.stringify({ error: 'Email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [rows] = await db.query<RowDataPacket[]>(
            'SELECT * FROM `users` WHERE `email` = ?',
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
            { id: user.id, role: user.role, name: user.name, last_name: user.last_name, email: user.email, phone: user.phone, institute: user.institute, qualification: user.qualification, department: user.department, graduation: user.graduation, duration: user.duration, company: user.company, designation: user.designation, experience: user.experience, business: user.business, plan: user.plan, skills: user.skills, switch: user.switch, file: user.file, photo: user.photo, logo: user.logo, primary: user.primary, status: user.status, password: user.password },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        const userData = {
            id: user.id, role: user.role, name: user.name, last_name: user.last_name, email: user.email, phone: user.phone, institute: user.institute, qualification: user.qualification, department: user.department, graduation: user.graduation, duration: user.duration, company: user.company, designation: user.designation, experience: user.experience, business: user.business, plan: user.plan, skills: user.skills, switch: user.switch, file: user.file, photo: user.photo, logo: user.logo, primary: user.primary, status: user.status, password: user.password
        };

        return new Response(
            JSON.stringify({ token, user: userData }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: 'Failed to authenticate user' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
