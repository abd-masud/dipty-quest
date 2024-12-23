// import { NextResponse } from 'next/server';
import { connectionToDatabase } from '../../db';

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return new Response(
                JSON.stringify({ error: "ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const db = await connectionToDatabase();

        const [result] = db.query < ResultSetHeader > (
            "DELETE FROM `categories` WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "Category not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Category deleted successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to delete category" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
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
//             "SELECT * FROM `categories` WHERE id = ?",
//             [id]
//         );

//         if (rows.length === 0) {
//             return NextResponse.json({ error: "Category not found" }, { status: 404 });
//         }

//         const category = rows[0];

//         return NextResponse.json(category);
//     } catch (error) {
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }