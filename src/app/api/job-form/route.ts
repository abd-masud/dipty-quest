import { ResultSetHeader } from 'mysql2';
import { connectionToDatabase } from '../db';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { job_id, user_id, apply_date } = requestBody;

        if (!job_id) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [existingUsers] = await db.query(
            'SELECT * FROM job_form WHERE job_id = ? AND user_id = ?',
            [job_id, user_id]
        );

        if ((existingUsers as any[]).length > 0) {
            return new Response(
                JSON.stringify({ error: 'You are already registered for this job.' }),
                { status: 409, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO job_form (job_id, user_id, apply_date, status) VALUES (?, ?, ?, ?)',
            [job_id, user_id, apply_date, "Applied"]
        );

        if (result.affectedRows == 1) {
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

        const [rows] = await db.query('SELECT * FROM `job_form`');

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

        if (result.affectedRows == 0) {
            return new Response(
                JSON.stringify({ error: "No category found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Category deleted successfully" }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to delete category" }),
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { applicationId, newStatus } = requestBody;

        if (!applicationId || !newStatus) {
            return new Response(JSON.stringify({ error: 'Missing required fields: applicationId and newStatus are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const [existingApplications] = await db.query(
            'SELECT * FROM job_form WHERE id = ?',
            [applicationId]
        );

        if ((existingApplications as any[]).length == 0) {
            return new Response(
                JSON.stringify({ error: 'Job application not found.' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const [result] = await db.query<ResultSetHeader>(
            'UPDATE job_form SET status = ? WHERE id = ?',
            [newStatus, applicationId]
        );

        if (result.affectedRows == 1) {
            return new Response(JSON.stringify({
                message: 'Job application status updated successfully',
                updatedId: applicationId,
                newStatus
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Failed to update job application status');
        }

    } catch (error) {
        console.error('Error updating job application status:', error);
        return new Response(JSON.stringify({ error: 'Failed to update job application status' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}