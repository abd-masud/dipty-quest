import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string | null;
            role?: string | null;
            name?: string | null;
            last_name?: string | null;
            email?: string | null;
            phone?: string | null;
            institute?: string | null;
            qualification?: string | null;
            department?: string | null;
            graduation?: string | null;
            duration?: string | null;
            company?: string | null;
            logo?: string | null;
            designation?: string | null;
            experience?: string | null;
            business?: string | null;
            plan?: string | null;
            skills?: string | null;
            switch?: string | null;
            file?: string | null
            photo?: string | null;
            image?: string | null;
            primary?: string | null
            status?: string | null;
            accessToken?: string | null;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string | null;
        role?: string | null;
        name?: string | null;
        last_name?: string | null;
        email?: string | null;
        phone?: string | null;
        institute?: string | null;
        qualification?: string | null;
        department?: string | null;
        graduation?: string | null;
        duration?: string | null;
        company?: string | null;
        logo?: string | null;
        designation?: string | null;
        experience?: string | null;
        business?: string | null;
        plan?: string | null;
        skills?: string | null;
        switch?: string | null;
        file?: string | null
        photo?: string | null;
        image?: string | null;
        primary?: string | null
        status?: string | null;
        accessToken?: string | null;
    }

    interface JWT extends DefaultJWT {
        id: string | null;
        role?: string | null;
        name?: string | null;
        last_name?: string | null;
        email?: string | null;
        phone?: string | null;
        institution?: string | null;
        qualification?: string | null;
        department?: string | null;
        graduation?: string | null;
        duration?: string | null;
        company?: string | null;
        logo?: string | null;
        designation?: string | null;
        experience?: string | null;
        business?: string | null;
        plan?: string | null;
        skills?: string | null;
        switch?: string | null;
        file?: string | null
        photo?: string | null;
        image?: string | null;
        primary?: string | null
        status?: string | null;
        accessToken?: string | null;
    }
}
