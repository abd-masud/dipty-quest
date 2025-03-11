import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
    }

    interface JWT extends DefaultJWT {
        id: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
    }
}
