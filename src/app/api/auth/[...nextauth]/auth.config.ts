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

                    if (rows.length === 0) {
                        throw new Error("Invalid email or password.");
                    }

                    const user = rows[0];
                    const isPasswordValid = await compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Invalid email or password.");
                    }

                    return {
                        id: user.id.toString(),
                        name: `${user.name} ${user.last_name}`,
                        email: user.email,
                        role: user.role,
                        image: user.image,
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
            if (account?.provider === "google") {
                let db;
                try {
                    db = await connectionToDatabase();
                    const [rows] = await db.query<RowDataPacket[]>(
                        "SELECT * FROM users WHERE email = ?",
                        [user.email]
                    );

                    if (rows.length === 0) {
                        await db.query(
                            "INSERT INTO users (name, email, role, image) VALUES (?, ?, ?, ?)",
                            [user.name, user.email, "Guest", user.image || null]
                        );

                        const [newUser] = await db.query<RowDataPacket[]>(
                            "SELECT * FROM users WHERE email = ?",
                            [user.email]
                        );

                        if (newUser.length > 0) {
                            user.id = newUser[0].id.toString();
                            user.role = newUser[0].role;
                        }
                    } else {
                        user.id = rows[0].id.toString();
                        user.role = rows[0].role;
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
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image
                };

                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.image = user.image;

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
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                role: token.role as string,
                image: token.image,
                accessToken: token.accessToken as string
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    cookies: {
        sessionToken: {
            name: "DiptyQuest.Auth",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            },
        },
    },
};