import { CustomError } from "@/lib/Error";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { nextOptions } from "./api/auth/[...nextauth]/options";
import { AdminRegisterSchema, profile, studentRegisterSchema } from "@/common/types";

export type AdminUser = Omit<Zod.infer<typeof AdminRegisterSchema>, "password"> & { profile:  Zod.infer<typeof profile>  } ;
export type StudentUser = Omit<Zod.infer<typeof studentRegisterSchema>, "password"> & { profile:  Zod.infer<typeof profile>  };

export type UserData = AdminUser | StudentUser | null | string  ;

export const getUser = async (): Promise<UserData> => {

  const session = await getServerSession(nextOptions);

  if (!session?.user) return null;

  const { id, role } = session?.user;

  try {

    const user =
      role === "Student"
        ? await prisma.user.findUnique({
            where: { id },
            include: { profile: true } 
          })
          : await prisma.admin.findUnique({
            where: { id },
            include: { profile: true } 
          });

    if (!user) throw new CustomError("User not found", false, 404);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword as StudentUser | AdminUser;

  } catch (error) {
    if (error instanceof CustomError) {
      return error.error;
    } else {
      return (error as Error).message ;
    }
  }
};


export const updateUserProfileData = async (updateData:any) => {
  
    const session = await getServerSession(nextOptions);

    if (!session?.user) return null;

    const {id, role} = session.user;

    try {

      const user =
        role === "Student"
          ? await prisma.user.update({
              where : {
                id: id
              },
              data: updateData,
              include: { profile: true } 
            })
            : await prisma.admin.update({
              where : {
                id: id
              },
              data: updateData,
              include: { profile: true } 
            });
  
      if (!user) throw new CustomError("User not found", false, 404);
  
      const { password, ...userWithoutPassword } = user;
  
      return userWithoutPassword as StudentUser | AdminUser;
  
    } catch (error) {
      if (error instanceof CustomError) {
        return error.error;
      } else {
        return (error as Error).message ;
      }
    }
}