import { connectionToDatabase } from '../../../db';
import { hash } from 'bcryptjs';
import path from 'path';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: { formData: () => any; }) {
    const data = await request.formData();

    const formDataString = data.get('data');
    const formFields = JSON.parse(formDataString);

    const {
        role, name, last_name, email, phone, institute, qualification,
        department, graduation, duration, company, experience, business,
        plan, skills, switch: switchValue, status, password, primary
    } = formFields;

    const primaryValue = primary === 'true';

    if (!password || !name || !last_name || !email || !phone) {
        return NextResponse.json({ success: false, message: "Missing required fields" });
    }

    const file = data.get('file');
    const photo = data.get('photo');

    if (!file || !photo) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const photoBytes = await photo.arrayBuffer();
    const photoBuffer = Buffer.from(photoBytes);
    const photoFile = photo.name;

    const fileBytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileBytes);
    const fileFile = file.name;

    try {
        await writeFile(path.join(process.cwd(), 'public/photo', photoFile), photoBuffer);
        const photoPost = `/photo/${photoFile}`;

        await writeFile(path.join(process.cwd(), 'public/file', fileFile), fileBuffer);
        const filePost = `/file/${fileFile}`;

        const hashedPassword = await hash(password, 10);

        const db = await connectionToDatabase();
        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO users (role, name, last_name, email, phone, institute, qualification, department, graduation, duration, company, experience, business, plan, skills, \`switch\`, file, photo, \`primary\`, status, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                role, name, last_name, email, phone, institute, qualification, department, graduation,
                duration, company, experience, business, plan, skills, switchValue, filePost, photoPost,
                primaryValue, status, hashedPassword
            ]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'User registered successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to insert user');
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return new Response(JSON.stringify({ error: 'Failed to register user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}



export async function GET(request: { url: string | URL; }) {
    try {
        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');

        const db = await connectionToDatabase();

        let query = 'SELECT * FROM users';
        const params = [];

        if (role) {
            query += ' WHERE role = ?';
            params.push(role);
        }

        const [users] = await db.query(query, params);

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
