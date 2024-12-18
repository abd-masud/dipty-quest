import { connectionToDatabase } from '../../db';
import { ResultSetHeader } from 'mysql2';

interface Event {
    id?: number;
    event: string;
    date: string;
    time_begin: string;
    time_end: string;
    location: string;
}

export async function PUT(request: Request): Promise<Response> {
    try {
        const requestBody: Event = await request.json();
        const { id, event, date, time_begin, time_end, location } = requestBody;

        if (!id || !event || !date || !time_begin || !time_end || !location) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [result] = await db.query<ResultSetHeader>(
            'UPDATE `events` SET `event` = ?, `date` = ?, `time_begin` = ?, `time_end` = ?, `location` = ? WHERE `id` = ?',
            [event, date, time_begin, time_end, location, id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function DELETE({ params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const db = await connectionToDatabase();

        const [result] = await db.query<ResultSetHeader>('DELETE FROM `events` WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify({ message: 'Event deleted successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
