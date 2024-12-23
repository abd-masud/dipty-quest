import { ResultSetHeader } from 'mysql2';
import { connectionToDatabase } from '../db';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { event_id, event_name, name, last_name, email, phone } = requestBody;

        if (!event_id || !event_name || !name || !last_name || !email || !phone) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO `event_form` (`event_id`, `event_name`, `name`, `last_name`, `email`, `phone`) VALUES (?, ?, ?, ?, ?, ?)',
            [event_id, event_name, name, last_name, email, phone]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Event form submitted successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to submit event form');
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to submit event form' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET() {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `event_form`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No entries found in event form' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch event forms' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
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
            "DELETE FROM event_form WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "No category found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Category deleted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during category deletion:", error);
        return new Response(
            JSON.stringify({ error: "Failed to delete category" }),
            { status: 500 }
        );
    }
}
