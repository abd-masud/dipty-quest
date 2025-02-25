import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { connectionToDatabase } from "../../db";
import { compare } from "bcryptjs";
import { RowDataPacket } from "mysql2";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            async profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    photo: profile.image,
                };
            },
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

                try {
                    const db = await connectionToDatabase();
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
                        photo: user.photo,
                    };
                } catch {
                    throw new Error("Failed to authenticate user.");
                }
            },
        }),
    ],
    pages: {
        signIn: "/authentication/login",
        error: "/authentication/login",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile?.email) {
                try {
                    const db = await connectionToDatabase();
                    const [existingUsers] = await db.query<RowDataPacket[]>(
                        "SELECT * FROM `users` WHERE `email` = ?",
                        [profile.email]
                    );

                    if (existingUsers.length === 0) {
                        const [result] = await db.query(
                            "INSERT INTO `users` (name, email, photo) VALUES (?, ?, ?)",
                            [profile.name, profile.email, profile.image]
                        );
                        console.log("Inserted new user with ID:", result);

                    }

                    return true;
                } catch (error) {
                    console.error("Error checking/creating user:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.name = user.name as string;
                token.email = user.email as string;
                token.photo = user.image as string | null;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.photo as string | null;
            }
            return session;
        }

    },
    session: {
        strategy: "jwt",
    },
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            },
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };