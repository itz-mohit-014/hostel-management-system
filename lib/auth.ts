import { getServerSession } from "next-auth";
import { nextOptions } from "@/app/api/auth/[...nextauth]/options";

export const getUserSessionData = async () => {
  "use server";

  const session = await getServerSession(nextOptions);

  if (!session || !session.user) return null;

  return session;
};
