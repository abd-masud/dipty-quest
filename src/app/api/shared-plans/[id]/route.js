import { connectionToDatabase } from '../../db';

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
            'DELETE FROM `shared_plans` WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'Plans not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'Plan deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to delete plan' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
