// import { NextResponse } from 'next/server';
import { connectionToDatabase } from '../../db';

export async function PUT(request) {
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

        const [result] = await db.query < ResultSetHeader > (
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

    } catch {
        return new Response(JSON.stringify({ error: 'Failed to update event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function DELETE(context) {
    try {
        const { id } = await context.params;

        if (!id || isNaN(Number(id))) {
            return new Response(JSON.stringify({ error: 'Invalid or missing ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const db = await connectionToDatabase();

        const [result] = await db.query < ResultSetHeader > (
            'DELETE FROM `events` WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Event deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// export async function GET({ params }) {
//     const { id } = await params;

//     if (!id) {
//         return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }

//     try {
//         const db = await connectionToDatabase();

//         const [rows] = await db.query(
//             "SELECT * FROM `events` WHERE id = ?",
//             [id]
//         );

//         if (rows.length === 0) {
//             return NextResponse.json({ error: "Event not found" }, { status: 404 });
//         }

//         const event = rows[0];

//         return NextResponse.json(event);
//     } catch (error) {
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }
