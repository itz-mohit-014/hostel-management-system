import { useSession } from "next-auth/react";

export const useClientSession = () => {

    const { data: session, status } = useSession();
    
    if (status === "loading") return undefined; 
    if (status === "unauthenticated" || !session?.user?.id) return null;

    return session.user;
};
