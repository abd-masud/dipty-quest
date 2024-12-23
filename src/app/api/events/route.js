import { connectionToDatabase } from '../db';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { event, date, duration, time_begin, time_end, location } = requestBody;

        if (!event || !date || !duration || !time_begin || !time_end || !location) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [result] = db.query < ResultSetHeader > (
            'INSERT INTO `events` (`event`, `date`, `duration`, `time_begin`, `time_end`, `location`) VALUES (?, ?, ?, ?, ?, ?)',
            [event, date, duration, time_begin, time_end, location]
        );

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'Event created successfully' }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to create event');
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to create event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function GET() {
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
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

