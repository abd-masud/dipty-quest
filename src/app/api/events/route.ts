import { connectionToDatabase } from '../db';
import { ResultSetHeader } from 'mysql2';

interface Event {
    id?: number;
    event: string;
    date: string;
    time_begin: string;
    time_end: string;
    location: string;
}

export async function POST(request: Request): Promise<Response> {
    try {
        const requestBody: Event = await request.json();
        const { event, date, time_begin, time_end, location } = requestBody;

        if (!event || !date || !time_begin || !time_end || !location) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO `events` (`event`, `date`, `time_begin`, `time_end`, `location`) VALUES (?, ?, ?, ?, ?)',
            [event, date, time_begin, time_end, location]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Event created successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to create event');
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(): Promise<Response> {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `events`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No events found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url);
        const pathParts = url.pathname.split('/');
        const id = pathParts[pathParts.length - 1];

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing event ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();
        const [result] = await db.query<ResultSetHeader>('DELETE FROM `events` WHERE `id` = ?', [id]);

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Event deleted successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

