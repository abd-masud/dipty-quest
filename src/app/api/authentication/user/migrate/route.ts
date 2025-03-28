import path from 'path';
import { hash } from 'bcryptjs';
import { writeFile } from 'fs/promises';
import { ResultSetHeader } from 'mysql2';
import { connectionToDatabase } from '../../../db';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(request: NextRequest) {
    try {
        const data = await request.formData();
        const formDataString = data.get('data');
        const formFields = JSON.parse(formDataString as string);

        const { id, role, phone, institute, qualification, department,
            graduation, duration, company, designation, experience, business, plan, skills,
            switch: switchValue, status, password, primary } = formFields;

        if (!id || !role) {
            return NextResponse.json({ success: false, message: "Missing required fields" });
        }

        const file = data.get('file') as File;
        const logo = data.get('logo');

        let filePost: string | null = null;
        if (file) {
            const fileBytes = await file.arrayBuffer();
            const fileBuffer = Buffer.from(fileBytes);
            const fileFile = file.name;
            await writeFile(path.join(process.cwd(), 'public/file', fileFile), fileBuffer);
            filePost = `/api/file/${fileFile}`;
        }

        let logoPost: string | null = null;
        if (logo == 'NA') {
            logoPost = 'NA';
        } else if (logo instanceof File) {
            const logoBytes = await logo.arrayBuffer();
            const logoBuffer = Buffer.from(logoBytes);
            const logoFile = logo.name;
            await writeFile(path.join(process.cwd(), 'public/logo', logoFile), logoBuffer);
            logoPost = `/api/logo/${logoFile}`;
        }

        const hashedPassword = password ? await hash(password, 10) : null;
        const primaryValue = primary == 'true';
        const skillsJson = JSON.stringify(skills);
        const db = await connectionToDatabase();

        const updateFields: string[] = [];
        const values: any[] = [];

        if (role) { updateFields.push('role = ?'); values.push(role); }
        if (phone) { updateFields.push('phone = ?'); values.push(phone); }
        if (institute) { updateFields.push('institute = ?'); values.push(institute); }
        if (qualification) { updateFields.push('qualification = ?'); values.push(qualification); }
        if (department) { updateFields.push('department = ?'); values.push(department); }
        if (graduation) { updateFields.push('graduation = ?'); values.push(graduation); }
        if (duration) { updateFields.push('duration = ?'); values.push(duration); }
        if (company) { updateFields.push('company = ?'); values.push(company); }
        if (designation) { updateFields.push('designation = ?'); values.push(designation); }
        if (experience) { updateFields.push('experience = ?'); values.push(experience); }
        if (business) { updateFields.push('business = ?'); values.push(business); }
        if (plan) { updateFields.push('plan = ?'); values.push(plan); }
        if (skills) { updateFields.push('skills = ?'); values.push(skillsJson); }
        if (switchValue !== undefined) { updateFields.push('`switch` = ?'); values.push(switchValue); }
        if (filePost) { updateFields.push('file = ?'); values.push(filePost); }
        if (logoPost) { updateFields.push('logo = ?'); values.push(logoPost); }
        if (primary !== undefined) { updateFields.push('`primary` = ?'); values.push(primaryValue); }
        if (status) { updateFields.push('status = ?'); values.push(status); }
        if (hashedPassword) { updateFields.push('password = ?'); values.push(hashedPassword); }

        values.push(id);

        const [result] = await db.query<ResultSetHeader>(
            `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`, values
        );

        if (result.affectedRows == 1) {
            return NextResponse.json({ success: true, message: 'User updated successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'No changes made or user not found' }, { status: 400 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, error: 'Failed to update user' }, { status: 500 });
    }
}
