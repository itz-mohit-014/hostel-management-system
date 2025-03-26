import { getServerSession } from "next-auth"
import { nextOptions } from "../app/api/auth/[...nextauth]/options"

export const serverSession = async () => {
    const session = await getServerSession(nextOptions);

    if(!session?.user.id || new Date(session.expires) < new Date() ) return null;

    return session.user;
}

