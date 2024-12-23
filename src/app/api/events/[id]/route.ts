import { NextRequest } from 'next/server';
import { connectionToDatabase } from '../../db';
import { ResultSetHeader } from 'mysql2';

export async function PUT(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { id, event, date, duration, time_begin, time_end, location } = requestBody;

        if (!id || !event || !date || !duration || !time_begin || !time_end || !location) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [result] = await db.query<ResultSetHeader>(
            'UPDATE `events` SET `event` = ?, `date` = ?, `duration` = ?, `time_begin` = ?, `time_end` = ?, `location` = ? WHERE `id` = ?',
            [event, date, duration, time_begin, time_end, location, id]
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
        console.error('Error updating event:', error);
        return new Response(JSON.stringify({ error: 'Failed to update event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
