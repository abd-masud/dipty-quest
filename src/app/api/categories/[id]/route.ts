import { ResultSetHeader } from 'mysql2';
import { connectionToDatabase } from '../../db';


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
            "DELETE FROM categories WHERE id = ?",
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