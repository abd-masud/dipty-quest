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
                } catch (error) {
                    console.error("CredentialsProvider Error:", error);
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
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const db = await connectionToDatabase();

                    const [rows] = await db.query<RowDataPacket[]>(`
                    SELECT * FROM users WHERE email = ?`, [user.email]);

                    if (rows.length === 0) {
                        const insertQuery = `
                        INSERT INTO users (name, email, role, image) 
                        VALUES (?, ?, ?, ?)`
                            ;
                        await db.query(insertQuery, [
                            user.name,
                            user.email,
                            "Guest",
                            user.image || null,
                        ]);
                    }
                    return true;
                } catch (error) {
                    console.error("Google sign-in error:", error);
                    return false;
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, user }) {
            session.user.name = user.name || null;
            session.user.email = user.email || null;
            session.user.image = user.image || null;
            session.user.role = user.role || null;
            return session;
        },
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
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };