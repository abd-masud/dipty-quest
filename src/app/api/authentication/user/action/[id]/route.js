import { connectionToDatabase } from '../../../../db';
import { hash } from 'bcryptjs';

export async function PUT(request) {
    try {
        const requestBody = await request.json();
        const {
            id,
            role,
            name,
            last_name,
            email,
            phone,
            institute,
            qualification,
            department,
            graduation,
            duration,
            company,
            experience,
            business,
            plan,
            skills,
            switch: switchValue,
            resume,
            cv,
            photo,
            primary: primaryValue,
            password,
        } = requestBody;

        if (!id) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const db = await connectionToDatabase();

        const hashedPassword = password ? await hash(password, 10) : undefined;

        const updateQuery = `
            UPDATE users 
            SET role = ?, name = ?, last_name = ?, email = ?, phone = ?, institute = ?, qualification = ?, department = ?, graduation = ?, duration = ?, company = ?, experience = ?, business = ?, plan = ?, skills = ?, switch = ?, resume = ?, cv = ?, photo = ?, primary = ?${password ? ', password = ?' : ''}
            WHERE id = ?`;

        const updateValues = [
            role,
            name,
            last_name,
            email,
            phone,
            institute,
            qualification,
            department,
            graduation,
            duration,
            company,
            experience,
            business,
            plan,
            skills,
            switchValue,
            resume,
            cv,
            photo,
            primaryValue,
        ];

        if (hashedPassword) updateValues.push(hashedPassword);
        updateValues.push(id);

        const [result] = await db.query < ResultSetHeader > (updateQuery, updateValues);

        if (result.affectedRows === 1) {
            return new Response(JSON.stringify({ message: 'User updated successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'User not found or no changes made' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to update user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(
) {
    try {
        const { id } = context.params;

        if (!id) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }),
                { status: 400 }
            );
        }

        const db = await connectionToDatabase();

        const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ error: "No user found with the specified ID" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ message: "User deleted successfully" }),
            { status: 200 }
        );
    } catch {
        return new Response(
            JSON.stringify({ error: "Failed to delete user" }),
            { status: 500 }
        );
    }
}

