import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectionToDatabase } from "../../db";
import { compare } from "bcryptjs";
import { RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken';

export const authOptions: AuthOptions = {
    secret: process.env.SECRET_KEY,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required.");
                }

                let db;
                try {
                    db = await connectionToDatabase();
                    const [rows] = await db.query<RowDataPacket[]>(
                        "SELECT * FROM `users` WHERE `email` = ?",
                        [credentials.email]
                    );

                    if (rows.length == 0) {
                        throw new Error("Invalid email or password.");
                    }

                    const user = rows[0];
                    const isPasswordValid = await compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Invalid email or password.");
                    }

                    return {
                        id: user.id.toString(),
                        role: user.role,
                        name: `${user.name} ${user.last_name}`,
                        email: user.email,
                        phone: user.phone,
                        institute: user.institute,
                        qualification: user.qualification,
                        department: user.department,
                        graduation: user.graduation,
                        duration: user.duration,
                        company: user.company,
                        logo: user.logo,
                        designation: user.designation,
                        experience: user.experience,
                        business: user.business,
                        plan: user.plan,
                        skills: user.skills,
                        switch: user.switch,
                        file: user.file,
                        photo: user.photo,
                        image: user.image,
                        primary: user.primary,
                        status: user.status,
                    };
                } catch (error) {
                    console.error("CredentialsProvider Error:", error);
                    throw new Error("Authentication failed. Please try again.");
                } finally {
                    if (db) await db.end();
                }
            },
        }),
    ],
    pages: {
        signIn: "/authentication/login",
        error: "/authentication/login",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == "google") {
                let db;
                try {
                    db = await connectionToDatabase();
                    const [rows] = await db.query<RowDataPacket[]>(
                        "SELECT * FROM users WHERE email = ?",
                        [user.email]
                    );

                    if (rows.length == 0) {
                        await db.query(
                            "INSERT INTO users (name, email, role, image) VALUES (?, ?, ?, ?)",
                            [user.name, user.email, "guest", user.image || null]
                        );

                        const [newUser] = await db.query<RowDataPacket[]>(
                            "SELECT * FROM users WHERE email = ?",
                            [user.email]
                        );

                        if (newUser.length > 0) {
                            user.id = newUser[0].id.toString();
                            user.role = newUser[0].role;
                            user.name = newUser[0].name;
                            user.last_name = newUser[0].last_name;
                            user.email = newUser[0].email;
                            user.phone = newUser[0].phone;
                            user.institute = newUser[0].institute;
                            user.qualification = newUser[0].qualification;
                            user.department = newUser[0].department;
                            user.graduation = newUser[0].graduation;
                            user.duration = newUser[0].duration;
                            user.company = newUser[0].company;
                            user.logo = newUser[0].logo;
                            user.designation = newUser[0].designation;
                            user.experience = newUser[0].experience;
                            user.business = newUser[0].business;
                            user.plan = newUser[0].plan;
                            user.skills = newUser[0].plan;
                            user.switch = newUser[0].switch;
                            user.file = newUser[0].file;
                            user.photo = newUser[0].photo;
                            user.image = newUser[0].image;
                            user.primary = newUser[0].primary;
                            user.status = newUser[0].status;
                        }
                    } else {
                        user.id = rows[0].id.toString();
                        user.role = rows[0].role;
                        user.name = rows[0].name;
                        user.last_name = rows[0].last_name;
                        user.email = rows[0].email;
                        user.phone = rows[0].phone;
                        user.institute = rows[0].institute;
                        user.qualification = rows[0].qualification;
                        user.department = rows[0].department;
                        user.graduation = rows[0].graduation;
                        user.duration = rows[0].duration;
                        user.company = rows[0].company;
                        user.logo = rows[0].logo;
                        user.designation = rows[0].designation;
                        user.experience = rows[0].experience;
                        user.business = rows[0].business;
                        user.plan = rows[0].plan;
                        user.skills = rows[0].plan;
                        user.switch = rows[0].switch;
                        user.file = rows[0].file;
                        user.photo = rows[0].photo;
                        user.image = rows[0].image;
                        user.primary = rows[0].primary;
                        user.status = rows[0].status;
                    }

                    return true;
                } catch (error) {
                    console.error("Google sign-in error:", error);
                    return false;
                } finally {
                    if (db) await db.end();
                }
            }
            return true;
        },
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                const tokenPayload = {
                    id: user.id,
                    role: user.role,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    institute: user.institute,
                    qualification: user.qualification,
                    department: user.department,
                    graduation: user.graduation,
                    duration: user.duration,
                    company: user.company,
                    logo: user.logo,
                    designation: user.designation,
                    experience: user.experience,
                    business: user.business,
                    plan: user.plan,
                    skills: user.skills,
                    switch: user.switch,
                    file: user.file,
                    photo: user.photo,
                    image: user.image,
                    primary: user.primary,
                    status: user.status,
                };

                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.last_name = user.last_name;
                token.email = user.email;
                token.phone = user.phone;
                token.institute = user.institute;
                token.qualification = user.qualification;
                token.department = user.department;
                token.graduation = user.graduation;
                token.duration = user.duration;
                token.company = user.company;
                token.logo = user.logo;
                token.designation = user.designation;
                token.experience = user.experience;
                token.business = user.business;
                token.plan = user.plan;
                token.skills = user.skills;
                token.switch = user.switch;
                token.file = user.file;
                token.photo = user.photo;
                token.image = user.image;
                token.primary = user.primary;
                token.status = user.status;

                token.accessToken = jwt.sign(
                    tokenPayload,
                    process.env.SECRET_KEY!,
                    { expiresIn: '1h' }
                );
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user = {
                id: token.id,
                role: token.role,
                name: token.name,
                last_name: token.last_name,
                email: token.email,
                phone: token.phone,
                institute: token.institute,
                qualification: token.qualification,
                department: token.department,
                graduation: token.graduation,
                duration: token.duration,
                company: token.company,
                logo: token.logo,
                designation: token.designation,
                experience: token.experience,
                business: token.business,
                plan: token.plan,
                skills: token.skills,
                switch: token.switch,
                file: token.file,
                photo: token.photo,
                image: token.image,
                primary: token.primary,
                status: token.status,
                accessToken: token.accessToken
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin == baseUrl) return url
            return baseUrl
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    cookies: {
        sessionToken: {
            name: "DiptyQuest.Auth",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                sameSite: "lax",
                path: "/",
            },
        },
    },
};