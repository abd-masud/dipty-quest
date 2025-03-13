import { getSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

export async function GET(req: Request) {
    const nextApiRequest = req as unknown as NextApiRequest;
    const session = await getSession({ req: nextApiRequest });
    if (!session) {
        return new Response(JSON.stringify({ message: 'Not authenticated' }), { status: 401 });
    }
    return new Response(
        JSON.stringify({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        }),
        { status: 200 }
    );
}
