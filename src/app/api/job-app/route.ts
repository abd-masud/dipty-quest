import { connectionToDatabase } from '../db';
import { ResultSetHeader } from 'mysql2/promise';

export async function GET() {
    try {
        const db = await connectionToDatabase();

        const [rows] = await db.query('SELECT * FROM `job_app`');

        if (Array.isArray(rows) && rows.length > 0) {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No gigs found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch gigs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request: Request) {
    try {
        const db = await connectionToDatabase();
        const body = await request.json();

        const requiredFields = ['jobTitle', 'industry', 'department', 'position', 'division'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return new Response(JSON.stringify({ error: `${field} is required` }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        const query = `
            INSERT INTO job_app 
            (employerId, company, companyLogo, jobTitle, industry, department, position, gender, jobDeadline, division, district, upazila, fullAddress, 
             jobDescription, jobRequirements, minimumEducation, preferredEducation, salaryType, currency, salary, totalExperience, minimumExperience, maximumExperience, jobType, jobLevel, jobShift, 
             minimumAge, maximumAge, numberOfVacancy, jobSkill, skillExperience, jobBenefits, customQuestion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            body.employerId, body.company, body.companyLogo,
            body.jobTitle, body.industry, body.department, body.position, body.gender,
            body.jobDeadline, body.division, body.district, body.upazila,
            body.fullAddress, body.jobDescription, body.jobRequirements,
            body.minimumEducation, body.preferredEducation, body.salaryType,
            body.currency, body.salary,
            body.totalExperience, body.minimumExperience, body.maximumExperience,
            body.jobType, body.jobLevel, body.jobShift, body.minimumAge,
            body.maximumAge, body.numberOfVacancy, body.jobSkill,
            body.skillExperience, body.jobBenefits ? JSON.stringify(body.jobBenefits) : null,
            body.customQuestion || null
        ];


        const [result] = await db.query<ResultSetHeader>(query, values);

        return new Response(JSON.stringify({ message: 'Job added successfully', jobId: result.insertId }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Database Insert Error:', error);

        return new Response(JSON.stringify({ error: 'Failed to add job' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request: Request) {
    try {
        const db = await connectionToDatabase();
        const body = await request.json();

        if (!body.id || !body.publication) {
            return new Response(JSON.stringify({ error: "ID and Publication status are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const query = `UPDATE job_app SET publication = ? WHERE id = ?`;
        const values = [body.publication, body.id];

        const [result] = await db.query<ResultSetHeader>(query, values);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: "Job not found or no changes made" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Publication status updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Database Update Error:", error);

        return new Response(JSON.stringify({ error: "Failed to update publication status" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
