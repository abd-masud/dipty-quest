import path from 'path';
import { hash } from 'bcryptjs';
import { writeFile } from 'fs/promises';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

import { connectionToDatabase } from '../../../db';
import { NextRequest, NextResponse } from 'next/server';

interface ExistingUserResult extends RowDataPacket {
    count: number;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();

        const formDataString = data.get('data');
        const formFields = JSON.parse(formDataString as string);

        const {
            role, name, last_name, email, phone, institute, qualification,
            department, graduation, duration, company, designation, experience, business,
            plan, skills, switch: switchValue, status, password, primary
        } = formFields;

        const primaryValue = primary === 'true';

        if (!password || !name || !last_name || !email || !phone) {
            return NextResponse.json({ success: false, message: "Missing required fields" });
        }

        const file = data.get('file') as File;
        const photo = data.get('photo') as File;
        const logo = data.get('logo');

        if (!file || !photo) {
            return NextResponse.json({ success: false, message: "File not uploaded" });
        }

        const photoBytes = await photo.arrayBuffer();
        const photoBuffer = Buffer.from(photoBytes);
        const photoFile = photo.name;
        await writeFile(path.join(process.cwd(), 'public/photo', photoFile), photoBuffer);
        const photoPost = `/photo/${photoFile}`;

        const fileBytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);
        const fileFile = file.name;
        await writeFile(path.join(process.cwd(), 'public/file', fileFile), fileBuffer);
        const filePost = `/file/${fileFile}`;

        let logoPost: string | null = null;

        if (logo == 'NA') {
            logoPost = 'NA';
        } else if (logo instanceof File) {
            const logoBytes = await logo.arrayBuffer();
            const logoBuffer = Buffer.from(logoBytes);
            const logoFile = logo.name;
            await writeFile(path.join(process.cwd(), 'public/logo', logoFile), logoBuffer);
            logoPost = `/logo/${logoFile}`;
        }

        const hashedPassword = await hash(password, 10);

        const db = await connectionToDatabase();

        const [existingUser] = await db.query<ExistingUserResult[]>(
            `SELECT COUNT(*) AS count FROM users WHERE email = ?`,
            [email]
        );

        if (existingUser[0]?.count > 0) {
            return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
        }

        const [result] = await db.query<ResultSetHeader>(
            `INSERT INTO users (role, name, last_name, email, phone, institute, qualification, department, graduation, duration, company, logo, designation, experience, business, plan, skills, \`switch\`, file, photo, \`primary\`, status, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                role, name, last_name, email, phone, institute, qualification, department, graduation,
                duration, company, logoPost, designation, experience, business, plan, skills, switchValue, filePost, photoPost,
                primaryValue, status, hashedPassword
            ]
        );

        if (result.affectedRows === 1) {
            return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
        } else {
            throw new Error('Failed to insert user');
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: false, error: 'Failed to register user' }, { status: 500 });
    }

}


export async function GET(request: NextRequest) {
    try {
        const role = request.headers.get("Role");

        const db = await connectionToDatabase();

        let query = "SELECT * FROM users";
        const params = [];

        if (role) {
            query += " WHERE role = ?";
            params.push(role);
        }

        const [users] = await db.query(query, params);

        return NextResponse.json(users, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }),
                { status: 400 }
            );
        }

        const db = await connectionToDatabase();

        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "No user found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "User deleted successfully" }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to delete user" }),
            { status: 500 }
        );
    }
}
