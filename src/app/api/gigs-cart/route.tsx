import { connectionToDatabase } from "../db";
import { ResultSetHeader } from "mysql2/promise";

export async function GET() {
  try {
    const db = await connectionToDatabase();

    const [rows] = await db.query("SELECT * FROM `gigs_cart`");

    if (Array.isArray(rows) && rows.length > 0) {
      return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "No gigs found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch gigs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const db = await connectionToDatabase();
    const body = await request.json();

    const requiredFields = ["gig_id", "user_id"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(JSON.stringify({ error: `${field} is required` }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const query = `INSERT INTO gigs_cart (gig_id, user_id)  VALUES (?, ?)`;

    const values = [body.gig_id, body.user_id];

    const [result] = await db.query<ResultSetHeader>(query, values);

    return new Response(
      JSON.stringify({
        message: "Job added successfully",
        jobId: result.insertId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database Insert Error:", error);

    return new Response(JSON.stringify({ error: "Failed to add job" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
